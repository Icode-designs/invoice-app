import { Address } from "./invoiceType";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  address: Address;
  profile_image: string;
}
