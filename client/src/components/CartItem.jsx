import React from "react";
import useCart from "../hooks/useCart";

const CartItem = ({ item }) => {
  const { editQty, removeItem } = useCart();

  const handleDecrement = async (item) => {
    if (item.qty === 1) {
      removeItem(item);
    } else {
      editQty(item.id, item.qty - 1);
    }
  };

  return (
    <div>
      <h5>{item.name}</h5>
      <h6>Qty: {item.qty}</h6>
      <button onClick={() => editQty(item.id, item.qty + 1)}>+</button>
      <button onClick={() => handleDecrement(item)}>-</button>
      <button onClick={() => removeItem(item)}>Remove from Cart</button>
    </div>
  );
};

export default CartItem;
