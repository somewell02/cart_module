import { CartItem } from "@/types/cart";

export interface Order {
  userId: number;
  products: CartItem[];
  installation: boolean;
}
