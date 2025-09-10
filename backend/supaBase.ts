import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Explicitly type  env variables so TS won’t complain
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create the client with correct typing
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
