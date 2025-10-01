import { Address, InvoiceType, Item } from "@/types/api/invoiceType";
import { getDateValue, getFormValue, getNumberValue } from "./validation";

const DEFAULT_VALUES = {
  DESCRIPTION: "",
  PAYMENT_TERMS: 0,
  ITEM_QUANTITY: "1",
  ITEM_PRICE: "0",
  ITEM_TOTAL: "0",
};
const FORM_FIELDS = {
  CREATEDATE: "createdate",
  PAYMENTDUE: "paymentdue",
  DESCRIPTION: "description",
  PAYMENTTERMS: "paymentterms",
  CLIENTNAME: "clientname",
  CLIENTEMAIL: "clientemail",
  RECIEVER_ADDRESS: "recieverAddress",
  RECIEVER_CITY: "recieverCity",
  RECIEVER_POSTCODE: "recieverPostcode",
  RECIEVER_COUNTRY: "recieverCountry",
  SENDER_ADDRESS: "senderAddress",
  SENDER_CITY: "senderCity",
  SENDER_POSTCODE: "senderPostcode",
  SENDER_COUNTRY: "senderCountry",
  ITEM_NAME: "itemname[]",
  QUANTITY: "quantity[]",
  PRICE: "price[]",
  TOTAL: "total[]",
  SINGLE_ITEM_NAME: "itemname",
  SINGLE_QUANTITY: "quantity",
  SINGLE_PRICE: "price",
  SINGLE_TOTAL: "total",
};

export const STATUS = {
  PAID: "paid",
  DRAFT: "draft",
  PENDING: "pending",
};

export async function parseInvoiceForm(
  formData: FormData,
  invoiceID: string
): Promise<InvoiceType> {
  const id = invoiceID;

  let createdate = getDateValue(formData, FORM_FIELDS.CREATEDATE);
  if (!createdate) {
    createdate = new Date().toISOString().split("T")[0];
  }

  const status = getFormValue(formData, "status");
  const paymentdue = getDateValue(formData, FORM_FIELDS.PAYMENTDUE);
  const description =
    getFormValue(formData, FORM_FIELDS.DESCRIPTION) ||
    DEFAULT_VALUES.DESCRIPTION;
  const paymentterms = getNumberValue(
    formData,
    FORM_FIELDS.PAYMENTTERMS,
    DEFAULT_VALUES.PAYMENT_TERMS
  );
  const clientname = getFormValue(formData, FORM_FIELDS.CLIENTNAME);
  const clientemail = getFormValue(formData, FORM_FIELDS.CLIENTEMAIL);

  if (!clientname || !clientemail) {
    throw new Error("Client name and email are required");
  }

  let totalArr = formData.getAll(FORM_FIELDS.TOTAL);
  if (totalArr.length === 0) {
    const singleTotal = formData.get(FORM_FIELDS.SINGLE_TOTAL);
    totalArr = singleTotal ? [singleTotal] : [];
  }

  const total = totalArr
    .map((val) => {
      const num = Number(val);
      return isNaN(num) ? 0 : num;
    })
    .reduce((acc, curr) => acc + curr, 0);

  const clientaddress: Address = {
    street: getFormValue(formData, FORM_FIELDS.RECIEVER_ADDRESS) || "",
    city: getFormValue(formData, FORM_FIELDS.RECIEVER_CITY) || "",
    postCode: getFormValue(formData, FORM_FIELDS.RECIEVER_POSTCODE) || "",
    country: getFormValue(formData, FORM_FIELDS.RECIEVER_COUNTRY) || "",
  };

  const senderaddress: Address = {
    street: getFormValue(formData, FORM_FIELDS.SENDER_ADDRESS) || "",
    city: getFormValue(formData, FORM_FIELDS.SENDER_CITY) || "",
    postCode: getFormValue(formData, FORM_FIELDS.SENDER_POSTCODE) || "",
    country: getFormValue(formData, FORM_FIELDS.SENDER_COUNTRY) || "",
  };

  let names = formData.getAll(FORM_FIELDS.ITEM_NAME);
  let quantities = formData.getAll(FORM_FIELDS.QUANTITY);
  let prices = formData.getAll(FORM_FIELDS.PRICE);
  let totals = formData.getAll(FORM_FIELDS.TOTAL);

  if (names.length === 0) {
    const singleName = formData.get(FORM_FIELDS.SINGLE_ITEM_NAME);
    const singleQty = formData.get(FORM_FIELDS.SINGLE_QUANTITY);
    const singlePrice = formData.get(FORM_FIELDS.SINGLE_PRICE);
    const singleTotal = formData.get(FORM_FIELDS.SINGLE_TOTAL);

    if (singleName) {
      names = [singleName];
      quantities = singleQty ? [singleQty] : [DEFAULT_VALUES.ITEM_QUANTITY];
      prices = singlePrice ? [singlePrice] : [DEFAULT_VALUES.ITEM_PRICE];
      totals = singleTotal ? [singleTotal] : [DEFAULT_VALUES.ITEM_TOTAL];
    }
  }

  const items: Item[] = names
    .map((_, i) => ({
      name: String(names[i] || ""),
      quantity: Number(quantities[i] || 1),
      price: Number(prices[i] || 0),
      total: Number(totals[i] || 0),
    }))
    .filter((item) => item.name.trim() !== "");

  if (items.length === 0) {
    throw new Error("At least one item is required");
  }

  return {
    id,
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
    status:
      status === STATUS.PAID
        ? STATUS.PAID
        : status === STATUS.PENDING
        ? STATUS.PENDING
        : STATUS.DRAFT,
  };
}
