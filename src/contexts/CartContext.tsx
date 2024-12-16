"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import WarningBox from "@/components/shop/warning-dialog";

interface CartItem {
  id: number;
  name: string;
  price: number;
  img: string;
  quantity: number;
  color: string;
  subtotal: number;
  stock_count: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateCartItemQuantity: (id: number, quantity: number) => void;
  isInCart: (itemId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [dialogStockCount, setDialogStockCount] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await fetch("/api/me");
        if (response.ok) {
          const userData = await response.json();
          setIsUserLoggedIn(true);
        } else {
          setIsUserLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsUserLoggedIn(false);
      }
    };

    checkUserAuthentication();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, []);

  const addToCart = (item: CartItem) => {
    if (item.stock_count < 1) {
      setDialogMessage(
        "Sorry, this item is currently out of stock. Please check back later.",
      );
      setDialogStockCount(item.stock_count);
      setIsDialogOpen(true);
      return;
    }

    if (!isUserLoggedIn) {
      setDialogMessage(
        "You need to be logged in to add items to the cart. Please log in to continue.",
      );
      setIsDialogOpen(true);
      return;
    }

    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    const newQuantity = existingItem
      ? existingItem.quantity + item.quantity
      : item.quantity;

    if (newQuantity > item.stock_count) {
      setDialogMessage(
        `Only ${item.stock_count} items are available. You can't add ${newQuantity} to the cart.`,
      );
      setDialogStockCount(item.stock_count);
      setIsDialogOpen(true);
      return;
    }

    let updatedCart;
    if (existingItem) {
      updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: newQuantity,
              subtotal: cartItem.price * newQuantity,
            }
          : cartItem,
      );
    } else {
      const newItem = { ...item, subtotal: item.price * item.quantity };
      updatedCart = [...cartItems, newItem];
    }

    setCartItems(updatedCart);

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const isInCart = (itemId: number): boolean => {
    return cartItems.some((item) => item.id === itemId);
  };

  const updateCartItemQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity, subtotal: item.price * quantity }
        : item,
    );
    setCartItems(updatedCart);

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        isInCart,
      }}
    >
      {children}
      <WarningBox
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        isUserLoggedIn={isUserLoggedIn}
        stockCount={dialogStockCount}
        onLoginRedirect={handleLoginRedirect}
        demand={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      />
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
