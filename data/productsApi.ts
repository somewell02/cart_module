import { Product } from "@/types/product";
import { products } from "@/data/productsList";

export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    resolve(products);
  });
};
