import { useCallback, useContext } from "react";
import CartContext from "../CartContext";

import {
  removeItemFromLocalStorage,
  editQtyInBackend,
  editQtyInLocalStorage,
  addItemToBackend,
  removeItemFromBackend,
  addItemToLocalStorage,
} from "../api/cart";

import useAuth from "./useAuth";

const useCart = () => {
  const { loggedIn } = useAuth();
  const { cart, setCart } = useContext(CartContext);

  const addItem = useCallback(
    async (item) => {
      if (loggedIn) {
        try {
          const result = await addItemToBackend(cart.id, item.id);
          if (result.name === "error") {
            console.log("Already in Your Cart!");
          } else {
            item.qty = 1;
            const newItems = [...cart.items, item];
            setCart((prevCart) => ({ ...prevCart, items: newItems }));
          }
        } catch (error) {
          console.log("Error adding item to backend:", error);
        }
      } else {
        addItemToLocalStorage(item.id);
        item.qty = 1;
        const newItems = [...cart.items, item];
        setCart((prevCart) => ({ ...prevCart, items: newItems }));
      }
    },
    [loggedIn, cart, setCart]
  );

  const removeItem = useCallback(
    async (newItem) => {
      if (loggedIn) {
        try {
          await removeItemFromBackend(cart.id, newItem.id);
          const filteredItems = cart.items.filter(
            (item) => item.id !== newItem.id
          );
          setCart((prevCart) => ({ ...prevCart, items: filteredItems }));
        } catch (error) {
          console.log("Error removing item from backend:", error);
        }
      } else {
        removeItemFromLocalStorage(newItem.id);
        const filteredItems = cart.items.filter(
          (item) => item.id !== newItem.id
        );
        setCart((prevCart) => ({ ...prevCart, items: filteredItems }));
      }
    },
    [loggedIn, cart, setCart]
  );

  const editQty = useCallback(
    async (itemId, newQty) => {
      if (loggedIn) {
        try {
          await editQtyInBackend(cart.id, itemId, newQty);
          const mappedItems = cart.items.map((item) => {
            if (item.id === itemId) {
              item.qty = newQty;
            }
            return item;
          });
          setCart((prevCart) => ({ ...prevCart, items: mappedItems }));
        } catch (error) {
          console.log("Error editing item in backend:", error);
        }
      } else {
        editQtyInLocalStorage(itemId, newQty);
        const mappedItems = cart.items.map((item) => {
          if (item.id === itemId) {
            item.qty = newQty;
          }
          return item;
        });
        setCart((prevCart) => ({ ...prevCart, items: mappedItems }));
      }
    },
    [loggedIn, cart, setCart]
  );

  return {
    cart,
    setCart,
    addItem,
    removeItem,
    editQty,
  };
};

export default useCart;
