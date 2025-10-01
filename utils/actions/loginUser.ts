import { supabase } from "@/lib/supabase/client";
import { getFormValue } from "../helpers/validation";

export const loginUser = async (formData: FormData) => {
  const email = getFormValue(formData, "email") || "";
  const password = getFormValue(formData, "password") || "";

  try {
    // 1. Sign in user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      return { success: false, error: error.message };
    }

    const user = data.user;
    if (!user) {
      throw new Error("No user returned after login");
    }

    console.log("Successfully logged in:", user.id);

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("User login error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return { success: false, error: errorMessage };
  }
};
