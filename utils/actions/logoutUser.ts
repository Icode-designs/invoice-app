import { supabase } from "@/lib/supabase/client";

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Couldn't log user out: ${error.message}`);
  }
}
