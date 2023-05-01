import axios from "axios";
import { Order } from "@/types/order";
import { API_URL } from "@/data/settings";

export const createOrder = async (order: Order): Promise<Order | undefined> => {
  try {
    const response = await axios.post(`${API_URL}/carts/add`, order, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.error((e as Error).message);
    return undefined;
  }
};
