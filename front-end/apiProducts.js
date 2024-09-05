import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    throw new Error("Products not found");
  }

  return data;
}

export async function getLatestProducts(limit = 8) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error(error);
    throw new Error("Products not found");
  }

  return data;
}

export async function getLatestTopProducts(limit = 8) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("top_product", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error(error);
    throw new Error("Top products not found");
  }

  return data;
}

export async function getProductsByCategory(category) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("product_category", category);

  if (error) {
    console.error(error);
    throw new Error("Products not found");
  }

  return data;
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Product not found");
  }

  return data;
}

// Fetch products from a specific category with a limit
export async function getProductsByCategoryWithLimit(category, limit = 4) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("product_category", category)
    .limit(limit);

  if (error) {
    console.error(error);
    throw new Error("Products not found");
  }

  return data;
}

// Fetch top-rated products with a limit
export async function getTopRatedProductsWithLimit(limit = 4) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("top_product", true)
    .limit(limit);

  if (error) {
    console.error(error);
    throw new Error("Top-rated products not found");
  }

  return data;
}
