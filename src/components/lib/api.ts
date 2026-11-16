
import type { Product } from "@/app/(store)/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log("API URL:", API_URL);

// Get All Products
export async function getAllProducts(): Promise<Product[]> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is missing from .env.local");
  }

  try {
    const url = `${API_URL}/products`;

    const response = await fetch(url, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();

    if (!Array.isArray(result.data)) {
      throw new Error("API response does not contain a products array");
    }

    return result.data;
  } catch (error) {
    console.error("getAllProducts Error:", error);
    throw error;
  }
}

// Category Type
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Get All Categories
export async function getCategories(): Promise<Category[]> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is missing from .env.local");
  }

  try {
    const url = `${API_URL}/categories`;

    const response = await fetch(url, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();

    if (!Array.isArray(result.data)) {
      throw new Error("API response does not contain a categories array");
    }

    return result.data;
  } catch (error) {
    console.error("getCategories Error:", error);
    throw error;
  }
}
