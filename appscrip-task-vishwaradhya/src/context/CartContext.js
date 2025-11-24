import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((p) => p.id !== id));

  const clearCart = () => setCartItems([]);

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, clearCart }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}
