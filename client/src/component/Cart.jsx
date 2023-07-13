import React from "react";
import useCart from "../hooks/useCart";
import CartItem from "./CartItem";

const Cart = () => {
  const { cart } = useCart();

  return (
    <div>
      <h3>Your Cart:</h3>
      {cart.items.length > 0 ? (
        cart.items.map((item, i) => <CartItem key={`i${i}`} item={item} />)
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
