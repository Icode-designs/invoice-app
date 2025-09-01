"use server";

import { supabase } from "@/api/supaBase";
import { Address, InvoiceType } from "@/types/api/invoiceType";
import { redirect } from "next/navigation";

function generateId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Helper function to safely handle form data
function getFormValue(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (value === null || value === undefined) return null;
  const stringValue = String(value).trim();
  return stringValue === "" ? null : stringValue;
}

// Helper function to handle date values specifically - FIXED
function getDateValue(formData: FormData, key: string): string | null {
  const value = getFormValue(formData, key);
  if (!value) return null;

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) {
    throw new Error(`Invalid date format for ${key}: ${value}`);
  }

  return value;
}

// Helper function to handle number values
function getNumberValue(
  formData: FormData,
  key: string,
  defaultValue = 0
): number {
  const value = getFormValue(formData, key);
  if (!value) return defaultValue;

  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`Invalid number for ${key}: ${value}`);
  }

  return num;
}

// Main save function with proper return type
async function saveInvoice(
  formData: FormData,
  status: "draft" | "pending"
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  try {
    // Debug: Log all form data
    console.log("=== FORM DATA DEBUG ===");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: "${value}" (type: ${typeof value})`);
    }
    console.log("=======================");

    const id = generateId();

    // Handle dates properly
    let createdate = getDateValue(formData, "createdate");
    const paymentdue = getDateValue(formData, "paymentdue");

    // If createdate is not provided, set it to today
    if (!createdate) {
      createdate = new Date().toISOString().split("T")[0];
      console.log("No createdate provided, setting to today:", createdate);
    }

    // Handle other fields safely
    const description = getFormValue(formData, "description") || "";
    const paymentterms = getNumberValue(formData, "paymentterms", 0);
    const clientname = getFormValue(formData, "clientname");
    const clientemail = getFormValue(formData, "clientemail");

    // Validate required client information
    if (!clientname || !clientemail) {
      throw new Error("Client name and email are required");
    }

    // Handle multiple items - check both naming conventions
    let totalArr = formData.getAll("total");
    if (totalArr.length === 0) {
      // Fallback to single field name if array notation not found
      const singleTotal = formData.get("total");
      totalArr = singleTotal ? [singleTotal] : [];
    }

    const total = totalArr
      .map((val) => {
        const num = Number(val);
        return isNaN(num) ? 0 : num;
      })
      .reduce((acc, curr) => acc + curr, 0);

    // Build addresses safely
    const clientaddress: Address = {
      street: getFormValue(formData, "recieverAddress") || "",
      city: getFormValue(formData, "recieverCity") || "",
      postCode: getFormValue(formData, "recieverPostcode") || "",
      country: getFormValue(formData, "recieverCountry") || "",
    };

    const senderaddress: Address = {
      street: getFormValue(formData, "senderAddress") || "",
      city: getFormValue(formData, "senderCity") || "",
      postCode: getFormValue(formData, "senderPostcode") || "",
      country: getFormValue(formData, "senderCountry") || "",
    };

    // Handle items array - check both naming conventions
    let names = formData.getAll("name[]");
    let quantities = formData.getAll("quantity[]");
    let prices = formData.getAll("price[]");
    let totals = formData.getAll("total[]");

    // Fallback to single field names if array notation not found
    if (names.length === 0) {
      const singleName = formData.get("name");
      const singleQty = formData.get("quantity");
      const singlePrice = formData.get("price");
      const singleTotal = formData.get("total");

      if (singleName) {
        names = [singleName];
        quantities = singleQty ? [singleQty] : ["1"];
        prices = singlePrice ? [singlePrice] : ["0"];
        totals = singleTotal ? [singleTotal] : ["0"];
      }
    }

    const items = names
      .map((_, i) => ({
        name: String(names[i] || ""),
        quantity: Number(quantities[i] || 1),
        price: Number(prices[i] || 0),
        total: Number(totals[i] || 0),
      }))
      .filter((item) => item.name.trim() !== ""); // Remove empty items

    // Validate at least one item exists
    if (items.length === 0) {
      throw new Error("At least one item is required");
    }

    const invoiceObj: Partial<InvoiceType> = {
      id,
      createdate,
      paymentdue,
      description,
      paymentterms,
      clientname,
      clientemail,
      status, // Use the passed status parameter
      total,
      senderaddress,
      clientaddress,
      items,
    };

    console.log("Attempting to save invoice:", invoiceObj);

    const { data, error } = await supabase
      .from("invoices")
      .insert(invoiceObj)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log("Invoice saved successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Save invoice error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return { success: false, error: errorMessage };
  }
}

// Server actions for form buttons
export async function handleSaveAsDraft(formData: FormData) {
  const result = await saveInvoice(formData, "draft");

  if (result.success) {
    console.log("Draft saved successfully");
    // Redirect or revalidate instead of calling client functions
    redirect("/"); // or wherever you want to go after saving
  } else {
    // Server actions can't use alert() - you'll need to handle errors differently
    // You could redirect to an error page or use cookies to pass error messages
    throw new Error(result.error || "Failed to save draft");
  }
}

export async function handleSaveAndSend(formData: FormData) {
  const result = await saveInvoice(formData, "pending");

  if (result.success) {
    console.log("Invoice saved and sent");
    // Redirect or revalidate instead of calling client functions
    redirect("/"); // or wherever you want to go after saving
  } else {
    // Server actions can't use alert() - you'll need to handle errors differently
    throw new Error(result.error || "Failed to save invoice");
  }
}
