import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Explicitly type  env variables so TS won’t complain
const supabaseUrl: string = "https://peskhrnesltzjxynzqat.supabase.co";
const supabaseKey: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlc2tocm5lc2x0emp4eW56cWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMjYyODMsImV4cCI6MjA3MTkwMjI4M30.YSMnFYSUrLmY7nYTYVMc5_1X5QXCZN5iTd8imYEpmHQ";

// Create the client with correct typing
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
