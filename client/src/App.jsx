import React from "react";
import Register from "./components/Register";
import useAuth from "./hooks/useAuth.js";
import { logOut } from "./api/auth";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Login from "./components/Login";

function App() {
  const { user, setLoggedIn } = useAuth();

  const handleLogout = async () => {
    await logOut();
    setLoggedIn(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Hello, {user?.username || "Guest"}!</h3>

      {user?.id ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Register />
          <Login />
        </>
      )}

      <Products />
      <Cart />
    </div>
  );
}

export default App;
