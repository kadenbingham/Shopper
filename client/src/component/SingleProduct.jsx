import React from "react";
import useCart from "../hooks/useCart";

const SingleProduct = ({ product }) => {
  const { addItem, cart } = useCart();

  const isProductInCart = cart.items.some((item) => item.name === product.name);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div>
      <div className="product_display">
        <h3>{product.name}</h3>
        <h4>{product.description}</h4>
        <h5>{product.price}</h5>
      </div>
      {isProductInCart ? (
        <h5>Already in Cart!</h5>
      ) : (
        <button onClick={handleAddToCart}>Add to Cart</button>
      )}
    </div>
  );
};

export default SingleProduct;
