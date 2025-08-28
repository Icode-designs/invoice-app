interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export type InvoiceType = {
  id: string;
  createdAt: string;
  paymentdue: string;
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
