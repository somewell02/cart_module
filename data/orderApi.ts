import axios from "axios";
import { Order } from "@/types/order";

export const createOrder = async (order: Order): Promise<Order> => {
  const response = await axios.post("/api/orders", order);
  return response.data;
};
