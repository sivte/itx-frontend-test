import axios from "axios";
import type {
  ProductItem,
  ProductDetail,
  AddToCartRequest,
  AddToCartResponse,
} from "@/schemas";
import { cache, CACHE_KEYS } from "@/utils/cache";
import {
  productDetailSchema,
  addToCartResponseSchema,
  productListSchema,
} from "@/schemas";

/**
 * Base URL for the API from environment variables
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * API endpoints configuration
 */
const ENDPOINTS = {
  PRODUCTS: "/product",
  PRODUCT_BY_ID: (id: string | number) => `/product/${id}`,
  CART: "/cart",
} as const;

/**
 * Axios instance
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getProducts(): Promise<ProductItem[]> {
  const cachedProducts = cache.get<ProductItem[]>(CACHE_KEYS.PRODUCTS);
  if (cachedProducts) {
    return cachedProducts;
  }

  try {
    const { data } = await apiClient.get(ENDPOINTS.PRODUCTS);

    const validatedData = productListSchema.parse(data);

    cache.set(CACHE_KEYS.PRODUCTS, validatedData);

    return validatedData;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to load products. Please try again later.");
  }
}

export async function getProductById(
  id: string | number,
): Promise<ProductDetail> {
  const cacheKey = CACHE_KEYS.PRODUCT_DETAIL(id);

  const cachedProduct = cache.get<ProductDetail>(cacheKey);
  if (cachedProduct) return cachedProduct;

  try {
    const { data } = await apiClient.get(ENDPOINTS.PRODUCT_BY_ID(id));

    const validatedData = productDetailSchema.parse(data);

    cache.set(cacheKey, validatedData);

    return validatedData;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error(`Failed to load product details. Please try again later.`);
  }
}

export async function addToCart(
  request: AddToCartRequest,
): Promise<AddToCartResponse> {
  try {
    const { data } = await apiClient.post(ENDPOINTS.CART, request);

    addToCartResponseSchema.parse(data);

    const currentCount = getCartCount();
    const newCount = currentCount + 1;

    localStorage.setItem(CACHE_KEYS.CART_COUNT, String(newCount));

    return { count: newCount };
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add product to cart. Please try again.");
  }
}

export function getCartCount(): number {
  try {
    const count = localStorage.getItem(CACHE_KEYS.CART_COUNT);
    return count ? parseInt(count, 10) : 0;
  } catch (error) {
    console.error("Error getting cart count:", error);
    return 0;
  }
}
