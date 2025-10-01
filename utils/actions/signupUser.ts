import { Address } from "@/types/api/invoiceType";
import { getFormValue } from "../helpers/validation";
import { supabase } from "@/lib/supabase/client";

export const signupUser = async (formData: FormData) => {
  const email = getFormValue(formData, "email") || "";
  const password = getFormValue(formData, "password") || "";
  const first_name = getFormValue(formData, "firstName") || "";
  const last_name = getFormValue(formData, "lastName") || "";

  const address: Address = {
    street: getFormValue(formData, "street") || "",
    city: getFormValue(formData, "city") || "",
    postCode: getFormValue(formData, "postcode") || "",
    country: getFormValue(formData, "country") || "",
  };

  const profileImgUrl: string | null = null;

  try {
    // 1. Sign up user
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    if (!error) console.log("success creating user");

    const user = data.user;
    if (!user) throw new Error("No user returned after signup");

    if (user) console.log(user.id);

    // 2. Ensure session is active
    await supabase.auth.refreshSession();

    // 4. Insert into profiles table
    const { error: insertError } = await supabase.from("profiles").insert({
      id: user.id,
      first_name,
      last_name,
      address,
      profile_image: profileImgUrl,
    });

    if (insertError) {
      console.error("Insert error:", insertError.message);
      throw new Error(`Failed to create profile: ${insertError.message}`);
    }

    return {
      success: true,
      user,
      profile: {
        first_name,
        last_name,
        address,
        profile_image: profileImgUrl,
      },
    };
  } catch (error) {
    console.error("User signup error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return { success: false, error: errorMessage };
  }
};
