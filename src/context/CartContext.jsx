import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useAuth();
  const getCartKey = () => {
    return currentUser
        ? `cart_${currentUser.email}`
        : "guestCart";
    };

    useEffect(() => {
      const currentCart = JSON.parse(
          localStorage.getItem(getCartKey())
          ) || [];
      if (currentUser) {
          const guestCart = JSON.parse(
              localStorage.getItem("guestCart")
          ) || [];
          if (guestCart.length > 0) {
            guestCart.forEach((guestItem) => {
              const existingItem = currentCart.find((item) => {
                if (item.pizzaId !== guestItem.pizzaId) {
                  return false;
                }
              if (item.toppings.length !== guestItem.toppings.length) {
                return false;
              }
              return JSON.stringify(item.toppings) === JSON.stringify(guestItem.toppings);
            });

          if (existingItem) {
              existingItem.quantity += guestItem.quantity;
          } else {
              currentCart.push(guestItem);
          }
      });

      localStorage.setItem(
          getCartKey(),
          JSON.stringify(currentCart)
      );

      localStorage.removeItem("guestCart");
    }
  }
  setCartItems(currentCart);
}, [currentUser]);

useEffect(() => {
  localStorage.setItem(
      getCartKey(),
      JSON.stringify(cartItems)
  );
  }, [cartItems, currentUser]);

  // Add item to cart
const addToCart = (newItem) => {
    setCartItems((prev) => {
        const existingItem = prev.find((item) => {
            if (item.pizzaId !== newItem.pizzaId) {
                return false;
            }
            if (item.toppings.length !== newItem.toppings.length) {
                return false;
            }
            return JSON.stringify(item.toppings) === JSON.stringify(newItem.toppings);
        });
        if (existingItem) {
            return prev.map((item) =>
                item.cartId === existingItem.cartId
                    ? {
                          ...item,
                          quantity: item.quantity + newItem.quantity,
                      }
                    : item
            );
        }
        return [...prev, newItem];
    });
};

// +1
  const increaseQuantity = (cartId) => {
    setCartItems((prev) =>
        prev.map((item) =>
            item.cartId === cartId
                ? {
                      ...item,
                      quantity: item.quantity + 1,
                  }
                : item
        )
    );
};

// -1
const decreaseQuantity = (cartId) => {
    setCartItems((prev) =>
        prev
            .map((item) =>
                item.cartId === cartId
                    ? {
                          ...item,
                          quantity: item.quantity - 1,
                      }
                    : item
            )
            .filter((item) => item.quantity > 0)
    );
};

// Remove one item
  const removeFromCart = (cartId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.cartId !== cartId)
    );
  };

// update cart
const updateCartItem = (cartId, updatedItem) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.cartId === cartId
        ? { ...updatedItem, cartId }
        : item
    )
  );

};

// clear cart
const clearCart = () => {
    setCartItems([]);
  };

// Total number of pizzas
  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cartItems]);

// Subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + (item.basePrice + item.extraPrice) * item.quantity,
      0
    );
  }, [cartItems]);

// export values
const value = {
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    cartCount,
    subtotal,
  };

  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}