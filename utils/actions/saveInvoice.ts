"use server";

import { supabase } from "@/api/supaBase";
import { Address, InvoiceType } from "@/types/api/invoiceType";

function generateId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function saveInvoice(formData: FormData): Promise<void> {
  const id = generateId();
  const createdate = String(formData.get("createdate"));
  const paymentdue = String(formData.get("paymentdue") ?? "");
  const description = String(formData.get("description") ?? "");
  const paymentterms = Number(formData.get("paymentterms") ?? 0);
  const clientname = String(formData.get("clientname") ?? "");
  const clientemail = String(formData.get("clientemail") ?? "");
  const status = "pending";
  const totalArr = formData.getAll("total");
  const total = totalArr
    .map((val) => Number(val))
    .reduce((acc, curr) => acc + curr, 0);
  const clientaddress: Address = {
    street: String(formData.get("recieverAddress")),
    city: String(formData.get("recieverCity")),
    postCode: String(formData.get("recieverPostcode")),
    country: String(formData.get("recieverCountry")),
  };
  const senderaddress: Address = {
    street: String(formData.get("senderAddress")),
    city: String(formData.get("senderCity")),
    postCode: String(formData.get("senderPostcode")),
    country: String(formData.get("senderCountry")),
  };

  const names = formData.getAll("name[]");
  const quantities = formData.getAll("quantity[]");
  const prices = formData.getAll("price[]");
  const totals = formData.getAll("total[]");

  const items = names.map((_, i) => ({
    name: String(names[i]),
    quantity: Number(quantities[i]),
    price: Number(prices[i]),
    total: Number(totals[i]),
  }));

  const invoiceObj: Partial<InvoiceType> = {
    id,
    createdate,
    paymentdue,
    description,
    paymentterms,
    clientname,
    clientemail,
    status,
    total,
    senderaddress,
    clientaddress,
    items,
  };

  //   const { error } = await supabase.from("invoices").insert(invoiceObj);

  //   if (error) {
  //     throw new Error(error.message);
  //   }

  console.log(invoiceObj);
}

export { saveInvoice };
