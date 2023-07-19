import React from "react";
import useProducts from "../hooks/useProducts";
import SingleProduct from "./SingleProduct";

const Products = () => {
  const { products } = useProducts();

  const renderProducts = () => {
    return (
      <>
        <h3>Products:</h3>
        {products.map((product, index) => (
          <SingleProduct key={index} product={product} />
        ))}
      </>
    );
  };

  return <div>{products?.length > 0 ? renderProducts() : null}</div>;
};

export default Products;
