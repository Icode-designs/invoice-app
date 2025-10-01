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
  id: string | null;
  createdate: string | null;
  paymentdue: string | null;
  description: string | null;
  paymentterms: number | null;
  clientname: string | null;
  clientemail: string | null;
  status: string | null;
  senderaddress: Address;
  clientaddress: Address;
  items: Item[];
  total: number;
  user_id?: string | null;
};
