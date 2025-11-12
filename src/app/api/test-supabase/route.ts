import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test fetching categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(1);

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      return NextResponse.json({ error: 'Failed to fetch categories', details: categoriesError.message }, { status: 500 });
    }

    // Test fetching problems
    const { data: problems, error: problemsError } = await supabase
      .from('problems')
      .select('*')
      .limit(1);

    if (problemsError) {
      console.error('Error fetching problems:', problemsError);
      return NextResponse.json({ error: 'Failed to fetch problems', details: problemsError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      categories: categories || [],
      problems: problems || []
    });
  } catch (error) {
    console.error('Unexpected error during Supabase test:', error);
    return NextResponse.json({ error: 'Unexpected error', details: (error as Error).message }, { status: 500 });
  }
}