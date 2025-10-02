"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { InvoiceType } from "@/types/api/invoiceType";
import { STATUS } from "../constants";

//  Main function to update an invoice in SupaBase
export async function updateInvoice(
  invoiceObj: InvoiceType
): Promise<{ success: boolean; data?: InvoiceType; error: string | null }> {
  try {
    const supabase = createServerActionClient({ cookies });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Authentication required" };
    }

    const { error, data } = await supabase
      .from("invoices")
      .update(invoiceObj)
      .eq("id", invoiceObj.id)
      .select("*") // ✅ ensure the updated row is returned
      .single();

    if (error) {
      console.error("SupaBase error:", error);
      return { success: false, error: `Database error: ${error.message}` };
    }

    if (!data) {
      return { success: false, error: "No invoice found with that ID" };
    }

    console.log("Invoice saved successfully:", data);
    return { success: true, data, error: null };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    console.error("Save invoice error:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

export async function handlePaidStatus(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerActionClient({
    cookies,
  });
  const { error } = await supabase
    .from("invoices")
    .update({ status: STATUS.PAID })
    .eq("id", id);
  if (error) {
    console.log(error.message);
    return { success: false, error: error.message };
  }
  return { success: true };
}
export async function handleDraftStatus(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerActionClient({
    cookies,
  });
  const { error } = await supabase
    .from("invoices")
    .update({ status: STATUS.DRAFT })
    .eq("id", id);
  if (error) {
    console.log(error.message);
    return { success: false, error: error.message };
  }
  return { success: true };
}
export async function handleDelete(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerActionClient({
    cookies,
  });
  const { error } = await supabase.from("invoices").delete().eq("id", id); // Match invoice by ID

  if (error) {
    console.error("Failed to delete invoice:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
