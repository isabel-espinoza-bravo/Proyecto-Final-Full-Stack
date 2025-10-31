import React, { createContext, useContext, useState } from "react";

// Crear contexto
const CartContext = createContext();

// Proveedor del contexto
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Agregar producto
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
  };

  // Eliminar producto
  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Total calculado
  const total = cart.reduce((sum, item) => sum + item.precio, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para usar el carrito
export function useCart() {
  return useContext(CartContext);
}
