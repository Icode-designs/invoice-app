"use server";

import { supabase } from "@/backend/supaBase";
import { Address, InvoiceType } from "@/types/api/invoiceType";
import { redirect } from "next/navigation";

//  Safely extract a string value from form data
function getFormValue(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (value === null || value === undefined) return null;
  const stringValue = String(value).trim();
  return stringValue === "" ? null : stringValue;
}

//  Extract and validate a date string (YYYY-MM-DD format)
function getDateValue(formData: FormData, key: string): string | null {
  const value = getFormValue(formData, key);
  if (!value) return null;

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) {
    throw new Error(`Invalid date format for ${key}: ${value}`);
  }

  return value;
}

//  Extract and validate a number value, with optional default
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

//  Main function to update an invoice in Supabase
async function updateInvoice(
  formData: FormData,
  invoiceID: string
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  try {
    //  Debug: Log all form data for inspection
    console.log("=== FORM DATA DEBUG ===");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: "${value}" (type: ${typeof value})`);
    }
    console.log("=======================");

    const id = invoiceID;

    //  Extract and validate date fields
    let createdate = getDateValue(formData, "createdate");
    const paymentdue = getDateValue(formData, "paymentdue");

    //  If no createdate is provided, default to today's date
    if (!createdate) {
      createdate = new Date().toISOString().split("T")[0];
      console.log("No createdate provided, setting to today:", createdate);
    }

    //  Extract other basic invoice fields
    const description = getFormValue(formData, "description") || "";
    const paymentterms = getNumberValue(formData, "paymentterms", 0);
    const clientname = getFormValue(formData, "clientname");
    const clientemail = getFormValue(formData, "clientemail");

    // Validate required fields
    if (!clientname || !clientemail) {
      throw new Error("Client name and email are required");
    }

    //  Extract total values (can be multiple items)
    let totalArr = formData.getAll("total");
    if (totalArr.length === 0) {
      const singleTotal = formData.get("total");
      totalArr = singleTotal ? [singleTotal] : [];
    }

    //  Calculate total invoice amount
    const total = totalArr
      .map((val) => {
        const num = Number(val);
        return isNaN(num) ? 0 : num;
      })
      .reduce((acc, curr) => acc + curr, 0);

    //  Build client and sender address objects
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

    //  Extract item details (name, quantity, price, total)
    let names = formData.getAll("name[]");
    let quantities = formData.getAll("quantity[]");
    let prices = formData.getAll("price[]");
    let totals = formData.getAll("total[]");

    //  Fallback to single item fields if array notation is missing
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

    //  Build item objects and filter out empty ones
    const items = names
      .map((_, i) => ({
        name: String(names[i] || ""),
        quantity: Number(quantities[i] || 1),
        price: Number(prices[i] || 0),
        total: Number(totals[i] || 0),
      }))
      .filter((item) => item.name.trim() !== "");

    //  Ensure at least one item is present
    if (items.length === 0) {
      throw new Error("At least one item is required");
    }

    //  Construct the invoice object to be saved
    const invoiceObj: Partial<InvoiceType> = {
      createdate,
      paymentdue,
      description,
      paymentterms,
      clientname,
      clientemail,
      total,
      senderaddress,
      clientaddress,
      items,
    };

    console.log("Attempting to save invoice:", invoiceObj);

    // 💾Update the invoice in Supabase
    const { error, data } = await supabase
      .from("invoices")
      .update(invoiceObj) // ✅ This was missing before
      .eq("id", id); // 🔍 Match the invoice by ID

    //  Handle database errors
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

//  Wrapper function to trigger invoice update
function saveUpdate(id: string) {
  return async (formData: FormData) => {
    await updateInvoice(formData, id);
  };
}

async function handlePaidStatus(id: string) {
  const { error } = await supabase
    .from("invoices")
    .update({ status: "paid" })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error.message);
  }
}
async function handleDelete(id: string) {
  // 🔹 Attempt to delete the invoice with the given ID
  const { error } = await supabase.from("invoices").delete().eq("id", id); // Match invoice by ID

  // ❌ If there's an error, log it and stop execution
  if (error) {
    console.error("Failed to delete invoice:", error.message);
    return; // Prevent redirect if deletion fails
  }

  return true;
}

export { saveUpdate, handleDelete, handlePaidStatus };
