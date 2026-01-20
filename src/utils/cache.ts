interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

class CacheService {
  /**
   * Gets an item from the cache
   * @param key - Item key in localStorage
   * @returns The data if it exists and hasn't expired, null otherwise
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        return null;
      }

      const cacheItem: CacheItem<T> = JSON.parse(item);
      const now = Date.now();
      const age = now - cacheItem.timestamp;

      // Check if it has expired (1 hour)
      if (age > CACHE_DURATION) {
        this.remove(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.error("Error reading from cache:", error);
      return null;
    }
  }

  /**
   * Saves an item to the cache
   * @param key - Item key in localStorage
   * @param data - Data to store
   */
  set<T>(key: string, data: T): void {
    try {
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cacheItem));
    } catch (error) {
      console.error("Error writing to cache:", error);
      // If localStorage is full, try cleaning old cache
      this.clearExpired();
      // Try again
      try {
        const cacheItem: CacheItem<T> = {
          data,
          timestamp: Date.now(),
        };
        localStorage.setItem(key, JSON.stringify(cacheItem));
      } catch (retryError) {
        console.error("Error writing to cache after cleanup:", retryError);
      }
    }
  }

  /**
   * Removes a specific item from the cache
   * @param key - Key of the item to remove
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from cache:", error);
    }
  }

  /**
   * Clears all application cache
   */
  clear(): void {
    try {
      // Only clear our app's keys
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith("mobile-shop:")) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  }

  /**
   * Clears only expired items from the cache
   */
  clearExpired(): void {
    try {
      const keys = Object.keys(localStorage);
      const now = Date.now();

      keys.forEach((key) => {
        if (!key.startsWith("mobile-shop:")) {
          return;
        }

        try {
          const item = localStorage.getItem(key);
          if (!item) return;

          const cacheItem: CacheItem<unknown> = JSON.parse(item);
          const age = now - cacheItem.timestamp;

          if (age > CACHE_DURATION) {
            localStorage.removeItem(key);
          }
        } catch {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error("Error clearing expired cache:", error);
    }
  }

  /**
   * Checks if an item exists in cache and hasn't expired
   * @param key - Item key
   * @returns true if it exists and is valid, false otherwise
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Gets the remaining time before an item expires
   * @param key - Item key
   * @returns Remaining milliseconds or null if it doesn't exist
   */
  getTimeToExpire(key: string): number | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const cacheItem: CacheItem<unknown> = JSON.parse(item);
      const now = Date.now();
      const age = now - cacheItem.timestamp;
      const remaining = CACHE_DURATION - age;

      return remaining > 0 ? remaining : null;
    } catch {
      return null;
    }
  }
}

// Export singleton instance
export const cache = new CacheService();

// Export useful constants
export const CACHE_KEYS = {
  PRODUCTS: "mobile-shop:products",
  PRODUCT_DETAIL: (id: string | number) => `mobile-shop:product:${id}`,
  CART_COUNT: "mobile-shop:cart-count",
  CART_ITEMS: "mobile-shop:cart-items",
} as const;

export { CACHE_DURATION };
