export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Item {
  name: string;
  quantity: number | null;
  price: number | null;
  total: number | null;
}

export type InvoiceType = {
  id: string;
  createdate: string;
  paymentdue: string | null;
  description: string;
  paymentterms: number;
  clientname: string;
  clientemail: string;
  status: "draft" | "pending" | "paid";
  senderaddress: Address;
  clientaddress: Address;
  items: Item[];
  total: number;
};
