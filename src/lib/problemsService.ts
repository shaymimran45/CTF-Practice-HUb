import { supabase } from './supabaseClient';

export interface Problem {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  solves: number;
  created_at: string;
  flag: string;
  hints?: string[];
  files?: FileInfo[];
}

export interface FileInfo {
  name: string;
  url: string;
  size: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
  points?: number;
}

export interface Submission {
  id: number;
  user_id: string;
  problem_id: number;
  flag: string;
  correct: boolean;
  submitted_at: string;
}

export interface UserProgress {
  user_id: string;
  problem_id: number;
  solved: boolean;
  solved_at: string | null;
}

// Get current user
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting current user:', error);
      return null;
    }
    
    if (!data.user) {
      return null;
    }
    
    // Get additional user data from our users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();
    
    if (userError) {
      console.error('Error fetching user data:', userError);
      // Return basic user info from auth
      return {
        id: data.user.id,
        username: data.user.email?.split('@')[0] || 'user',
        email: data.user.email || '',
        created_at: data.user.created_at || new Date().toISOString()
      };
    }
    
    return userData as User;
  } catch (error) {
    console.error('Unexpected error getting current user:', error);
    return null;
  }
}

// Check if current user is admin
export async function isAdmin() {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error || !data.user) {
      return false;
    }
    
    // Check if user has admin role in metadata
    return data.user.user_metadata?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

export async function getProblems() {
  try {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching problems:', error);
      return [];
    }

    return data as Problem[];
  } catch (error) {
    console.error('Unexpected error fetching problems:', error);
    return [];
  }
}

export async function getProblemById(id: number) {
  try {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching problem ${id}:`, error);
      return null;
    }

    return data as Problem;
  } catch (error) {
    console.error(`Unexpected error fetching problem ${id}:`, error);
    return null;
  }
}

export async function getProblemsByCategory(category: string) {
  try {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .eq('category', category)
      .order('points', { ascending: true });

    if (error) {
      console.error(`Error fetching problems for category ${category}:`, error);
      return [];
    }

    return data as Problem[];
  } catch (error) {
    console.error(`Unexpected error fetching problems for category ${category}:`, error);
    return [];
  }
}

export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data as Category[];
  } catch (error) {
    console.error('Unexpected error fetching categories:', error);
    return [];
  }
}

// Function to validate flag submission (WOW{} format)
export async function validateFlag(problemId: number, submittedFlag: string) {
  try {
    // Ensure the submitted flag follows WOW{} format
    if (!submittedFlag.match(/^WOW\{[^}]+\}$/)) {
      return false;
    }
    
    const { data, error } = await supabase
      .from('problems')
      .select('flag')
      .eq('id', problemId)
      .single();

    if (error) {
      console.error(`Error fetching flag for problem ${problemId}:`, error);
      return false;
    }

    // Check if submitted flag matches the stored flag
    return data.flag === submittedFlag;
  } catch (error) {
    console.error(`Unexpected error validating flag for problem ${problemId}:`, error);
    return false;
  }
}

// Function to get user progress
export async function getUserProgress(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error(`Error fetching progress for user ${userId}:`, error);
      return [];
    }

    return data as UserProgress[];
  } catch (error) {
    console.error(`Unexpected error fetching progress for user ${userId}:`, error);
    return [];
  }
}

// Function to update user progress
export async function updateUserProgress(userId: string, problemId: number, solved: boolean) {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        problem_id: problemId,
        solved: solved,
        solved_at: solved ? new Date().toISOString() : null
      }, {
        onConflict: 'user_id,problem_id'
      });

    if (error) {
      console.error(`Error updating progress for user ${userId} on problem ${problemId}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Unexpected error updating progress for user ${userId} on problem ${problemId}:`, error);
    return null;
  }
}

// Function to record submission
export async function recordSubmission(userId: string, problemId: number, flag: string, correct: boolean) {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .insert({
        user_id: userId,
        problem_id: problemId,
        flag: flag,
        correct: correct,
        submitted_at: new Date().toISOString()
      });

    if (error) {
      console.error(`Error recording submission for user ${userId} on problem ${problemId}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Unexpected error recording submission for user ${userId} on problem ${problemId}:`, error);
    return null;
  }
}

// Function to increment problem solves count
export async function incrementProblemSolves(problemId: number) {
  try {
    // First, get the current solves count
    const { data: problemData, error: fetchError } = await supabase
      .from('problems')
      .select('solves')
      .eq('id', problemId)
      .single();

    if (fetchError) {
      console.error(`Error fetching problem ${problemId} for solves increment:`, fetchError);
      return null;
    }

    // Update with incremented solves count
    const { data, error } = await supabase
      .from('problems')
      .update({ solves: (problemData.solves || 0) + 1 })
      .eq('id', problemId);

    if (error) {
      console.error(`Error incrementing solves for problem ${problemId}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Unexpected error incrementing solves for problem ${problemId}:`, error);
    return null;
  }
}

// Function to get user profile
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error(`Error fetching profile for user ${userId}:`, error);
      return null;
    }

    return data as User;
  } catch (error) {
    console.error(`Unexpected error fetching profile for user ${userId}:`, error);
    return null;
  }
}

// Function to get leaderboard data
export async function getLeaderboard() {
  try {
    // Get users with their points calculated
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, username, email, created_at');

    if (usersError) {
      console.error('Error fetching users for leaderboard:', usersError);
      return [];
    }

    // For each user, calculate their total points
    const leaderboard = await Promise.all(users.map(async (user) => {
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('problem_id')
        .eq('user_id', user.id)
        .eq('solved', true);

      if (progressError) {
        console.error(`Error fetching progress for user ${user.id}:`, progressError);
        return { ...user, points: 0 };
      }

      // Get points for each solved problem
      let totalPoints = 0;
      for (const progress of progressData) {
        const { data: problemData, error: problemError } = await supabase
          .from('problems')
          .select('points')
          .eq('id', progress.problem_id)
          .single();

        if (!problemError && problemData) {
          totalPoints += problemData.points;
        }
      }

      return { ...user, points: totalPoints };
    }));

    // Sort by points descending
    return leaderboard.sort((a, b) => (b.points || 0) - (a.points || 0));
  } catch (error) {
    console.error('Unexpected error fetching leaderboard:', error);
    return [];
  }
}