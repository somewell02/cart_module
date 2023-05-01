import axios from "axios";
import { Product } from "@/types/product";
import { API_URL } from "@/data/settings";

export const getProducts = async (): Promise<Product[] | undefined> => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.products;
  } catch (e) {
    console.error((e as Error).message);
    return undefined;
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/products/search`, {
      params: {
        q: query,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.products;
  } catch (e) {
    console.error((e as Error).message);
    return [];
  }
};
