"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getInvoices() {
  console.log("Attempting to fetch invoices...");
  const supabase = createServerComponentClient({
    cookies,
  });
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error fetching user or no user found:", userError);
    return { data: null, error: userError };
  }

  console.log("Authenticated user:", user.id);

  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("user_id", user?.id)
    .order("createdate", { ascending: false });

  if (error) {
    console.error("Error fetching invoices:", error);
  }

  console.log("Fetched invoices data:", data);

  return { data, error: error };
}

export async function getInvoice(id: string) {
  console.log("Attempting to fetch invoices...");
  const supabase = createServerComponentClient({
    cookies,
  });
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error fetching user or no user found:", userError);
    return { data: null, error: userError };
  }

  console.log("Authenticated user:", user.id);

  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching invoices:", error);
  }

  console.log("Fetched invoices data:", data);

  return { data, error: error };
}
