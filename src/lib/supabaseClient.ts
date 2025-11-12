import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tvbubgxxqzytmrxbmeuz.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with the database
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// For server-side operations that need full access
export const supabaseAdmin = () => {
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'SUPABASE_SERVICE_KEY';
  return createClient(SUPABASE_URL, SERVICE_KEY);
};