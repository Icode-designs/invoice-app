"use client";
import { createContext, useState, useEffect } from "react";
import { User } from "@/types/api/userType";
import { currentUserProfile } from "@/utils/helpers/currentUser";
import { supabase } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js"; //

export interface UserContextType {
  authUser: SupabaseUser | null; // Supabase user object
  userProfile: User | null; // your profile row
  isLoading: boolean;
  error: string | null;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<SupabaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔑 Fetch user + profile
  async function loadUser() {
    try {
      setIsLoading(true);
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      setAuthUser(user);

      if (user) {
        const profile = await currentUserProfile();
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // initial load
    loadUser();

    // 🔥 subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser(); // reload user & profile whenever auth changes
    });

    // cleanup on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value: UserContextType = { authUser, userProfile, isLoading, error };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
