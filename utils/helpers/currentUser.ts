import { supabase } from "@/lib/supabase/client";

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }

  return user;
};

export const currentUserProfile = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("No user is logged in");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }

  return data;
};
