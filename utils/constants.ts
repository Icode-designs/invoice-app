//generate id
export function generateId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const DEFAULT_VALUES = {
  DESCRIPTION: "",
  PAYMENT_TERMS: 0,
  ITEM_QUANTITY: "1",
  ITEM_PRICE: "0",
  ITEM_TOTAL: "0",
};
export const FORM_FIELDS = {
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
