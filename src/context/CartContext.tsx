import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import { addToCart as addToCartApi } from "@/services/api";
import { CACHE_KEYS } from "@/utils/cache";

export interface CartItem {
  id: string;
  colorCode: number;
  storageCode: number;
}

export interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  addToCart: (
    productId: string,
    colorCode: number,
    storageCode: number,
  ) => Promise<void>;
  removeFromCart: (
    productId: string,
    colorCode: number,
    storageCode: number,
  ) => void;
  clearCart: () => void;
  error: string | null;
  clearError: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

/**
 * Load cart items from localStorage
 */
const loadCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CACHE_KEYS.CART_ITEMS);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error loading cart from storage:", error);
    return [];
  }
};

/**
 * Save cart items to localStorage
 */
const saveCartToStorage = (items: CartItem[]): void => {
  try {
    localStorage.setItem(CACHE_KEYS.CART_ITEMS, JSON.stringify(items));
  } catch (error) {
    console.error("Error saving cart to storage:", error);
  }
};

function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage);
  const [error, setError] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const addToCart = async (
    productId: string,
    colorCode: number,
    storageCode: number,
  ) => {
    try {
      setError(null);

      await addToCartApi({
        id: productId,
        colorCode,
        storageCode,
      });

      setCart((prevCart) => [
        ...prevCart,
        { id: productId, colorCode, storageCode },
      ]);

      openDrawer();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to add product to cart";
      setError(errorMessage);
      throw err;
    }
  };

  const clearError = () => setError(null);

  const removeFromCart = (
    productId: string,
    colorCode: number,
    storageCode: number,
  ) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(
        (item) =>
          item.id === productId &&
          item.colorCode === colorCode &&
          item.storageCode === storageCode,
      );
      if (index > -1) {
        const newCart = [...prevCart];
        newCart.splice(index, 1);
        return newCart;
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    saveCartToStorage([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartCount: cart.length,
        cartItems: cart,
        addToCart,
        removeFromCart,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        clearCart,
        error,
        clearError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { CartProvider };
