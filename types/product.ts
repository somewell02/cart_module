export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  specifications?: string;
  thumbnail?: string;
  images?: string[];
  brand?: string;
  stock?: number;
  rating?: number;
}
