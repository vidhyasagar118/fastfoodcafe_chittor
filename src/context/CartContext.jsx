import {
  createContext,
  useState,
  useEffect,
} from "react";

export const CartContext = createContext();

export const CartProvider = ({
  children,
}) => {

  const email =
  localStorage.getItem("userEmail");

const [cart, setCart] = useState(() => {
  const savedCart =
    localStorage.getItem(`cart_${email}`);

  return savedCart
    ? JSON.parse(savedCart)
    : [];
});

  /* Save Cart */
useEffect(() => {
  if (email) {
    localStorage.setItem(
      `cart_${email}`,
      JSON.stringify(cart)
    );
  }
}, [cart, email]);

  /* Add Item */

 const addToCart = (item) => {
  setCart((prevCart) => {
    const exist = prevCart.find(
      (x) => x._id === item._id
    );

    if (exist) {
      return prevCart.map((x) =>
        x._id === item._id
          ? {
              ...x,
              qty: x.qty + 1,
            }
          : x
      );
    }

    return [
      ...prevCart,
      {
        ...item,
        qty: 1,
      },
    ];
  });
};

  /* Increase Qty */
const increase = (id) => {
  setCart((prevCart) =>
    prevCart.map((x) =>
      x._id === id
        ? { ...x, qty: x.qty + 1 }
        : x
    )
  );
};

  /* Decrease Qty */
const decrease = (id) => {
  setCart((prevCart) =>
    prevCart
      .map((x) =>
        x._id === id
          ? { ...x, qty: x.qty - 1 }
          : x
      )
      .filter((x) => x.qty > 0)
  );
};

  
  /* Remove Item */

  const removeItem = (id) => {

    setCart(
      cart.filter(
        (item) => item._id !== id
      )
    );

  };

  /* Clear Cart */

  const clearCart = () => {
    setCart([]);
  };

  /* Total Price */

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.price * item.qty,
    0
  );

  /* Total Items */

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increase,
        decrease,
        removeItem,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};