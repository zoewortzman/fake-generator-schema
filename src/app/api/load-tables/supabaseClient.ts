import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and anon key
const supabaseUrl = 'https://urabuonbrmozvckwiend.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyYWJ1b25icm1venZja3dpZW5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MjQxNzYsImV4cCI6MjA0MTUwMDE3Nn0.A6Qv-YIb3nuA_BMBXQn9IRI0f3X1iDjlM7y2zq6Xgco';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);