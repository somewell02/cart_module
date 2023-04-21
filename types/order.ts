import { CartItem } from "@/types/cart";

export interface User {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
}

export interface Order {
  user: User;
  products: CartItem[];
  installation: boolean;
}
