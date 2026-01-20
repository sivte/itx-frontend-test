import { describe, it, expect, beforeEach, vi } from "vitest";
import { cache, CACHE_KEYS, CACHE_DURATION } from "./cache";

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => Object.keys(store)[index] || null,
    getStore: () => store,
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
  writable: true,
});

Object.keys = (obj) => {
  if (obj === localStorage) {
    return Object.keys((localStorageMock as any).getStore());
  }
  return Object.getOwnPropertyNames(obj);
};

describe("CacheService", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("set and get", () => {
    it("should store and retrieve data", () => {
      const testData = { id: 1, name: "Test Product" };
      cache.set(CACHE_KEYS.PRODUCTS, testData);

      const retrieved = cache.get(CACHE_KEYS.PRODUCTS);
      expect(retrieved).toEqual(testData);
    });

    it("should return null for non-existent keys", () => {
      const result = cache.get("non-existent-key");
      expect(result).toBeNull();
    });

    it("should handle different data types", () => {
      const stringData = "test string";
      const numberData = 42;
      const arrayData = [1, 2, 3];
      const objectData = { nested: { value: true } };

      cache.set("string", stringData);
      cache.set("number", numberData);
      cache.set("array", arrayData);
      cache.set("object", objectData);

      expect(cache.get("string")).toBe(stringData);
      expect(cache.get("number")).toBe(numberData);
      expect(cache.get("array")).toEqual(arrayData);
      expect(cache.get("object")).toEqual(objectData);
    });
  });

  describe("expiration", () => {
    it("should return null for expired items", () => {
      const testData = { id: 1, name: "Expired" };
      cache.set(CACHE_KEYS.PRODUCTS, testData);

      const stored = localStorage.getItem(CACHE_KEYS.PRODUCTS);
      const cacheItem = JSON.parse(stored!);
      cacheItem.timestamp = Date.now() - CACHE_DURATION - 1000;
      localStorage.setItem(CACHE_KEYS.PRODUCTS, JSON.stringify(cacheItem));

      const result = cache.get(CACHE_KEYS.PRODUCTS);
      expect(result).toBeNull();
    });

    it("should return data that has not expired", () => {
      const testData = { id: 1, name: "Valid" };
      cache.set(CACHE_KEYS.PRODUCTS, testData);

      const result = cache.get(CACHE_KEYS.PRODUCTS);
      expect(result).toEqual(testData);
    });
  });

  describe("remove", () => {
    it("should remove item from cache", () => {
      const testData = { id: 1 };
      cache.set(CACHE_KEYS.PRODUCTS, testData);

      expect(cache.get(CACHE_KEYS.PRODUCTS)).toEqual(testData);

      cache.remove(CACHE_KEYS.PRODUCTS);
      expect(cache.get(CACHE_KEYS.PRODUCTS)).toBeNull();
    });
  });

  describe("clear", () => {
    it("should clear all mobile-shop keys", () => {
      cache.set(CACHE_KEYS.PRODUCTS, { id: 1 });
      cache.set(CACHE_KEYS.CART_ITEMS, []);
      localStorage.setItem("other-app:data", "should-remain");

      expect(cache.get(CACHE_KEYS.PRODUCTS)).toEqual({ id: 1 });

      cache.clear();

      expect(cache.get(CACHE_KEYS.PRODUCTS)).toBeNull();
      expect(cache.get(CACHE_KEYS.CART_ITEMS)).toBeNull();
      expect(localStorage.getItem("other-app:data")).toBe("should-remain");
    });
  });

  describe("has", () => {
    it("should return true for existing valid items", () => {
      cache.set(CACHE_KEYS.PRODUCTS, { id: 1 });
      expect(cache.has(CACHE_KEYS.PRODUCTS)).toBe(true);
    });

    it("should return false for non-existent items", () => {
      expect(cache.has("non-existent")).toBe(false);
    });

    it("should return false for expired items", () => {
      cache.set(CACHE_KEYS.PRODUCTS, { id: 1 });

      const stored = localStorage.getItem(CACHE_KEYS.PRODUCTS);
      const cacheItem = JSON.parse(stored!);
      cacheItem.timestamp = Date.now() - CACHE_DURATION - 1000;
      localStorage.setItem(CACHE_KEYS.PRODUCTS, JSON.stringify(cacheItem));

      expect(cache.has(CACHE_KEYS.PRODUCTS)).toBe(false);
    });
  });

  describe("CACHE_KEYS", () => {
    it("should generate correct product detail key", () => {
      expect(CACHE_KEYS.PRODUCT_DETAIL(123)).toBe("mobile-shop:product:123");
      expect(CACHE_KEYS.PRODUCT_DETAIL("abc")).toBe("mobile-shop:product:abc");
    });

    it("should have correct static keys", () => {
      expect(CACHE_KEYS.PRODUCTS).toBe("mobile-shop:products");
      expect(CACHE_KEYS.CART_COUNT).toBe("mobile-shop:cart-count");
      expect(CACHE_KEYS.CART_ITEMS).toBe("mobile-shop:cart-items");
    });
  });
});
