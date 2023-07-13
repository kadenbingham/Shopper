import { createRoot } from "react-dom/client";
import App from "./App";
import AuthProvider from "./components/AuthProvider";
import CartProvider from "./components/CartProvider";
import ProductsProvider from "./components/ProductsProvider";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ProductsProvider>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </ProductsProvider>
);
