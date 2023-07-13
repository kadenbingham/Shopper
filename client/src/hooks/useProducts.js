import { useContext } from "react";
import ProductsContext from "../ProductsContext";

const useProducts = () => {
  const { products } = useContext(ProductsContext);

  return {
    products,
  };
};

export default useProducts;
