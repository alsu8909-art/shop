import type { Product } from "./types";

const API_URL =
  "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to load products");
  return await response.json();
}
