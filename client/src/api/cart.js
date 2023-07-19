export const fetchLocalStorageCart = (products) => {
  const localCart = JSON.parse(localStorage.getItem("cart")) || {};
  const existingItems = [];

  for (const key in localCart) {
    const product = products?.find((element) => element.id === +key);
    if (product) {
      existingItems.push({ ...product, qty: localCart[key] });
    }
  }

  return existingItems;
};

export const addItemToLocalStorage = (productId) => {
  const localCart = JSON.parse(localStorage.getItem("cart")) || {};
  localCart[productId] = (localCart[productId] || 0) + 1;
  localStorage.setItem("cart", JSON.stringify(localCart));
};

export const removeItemFromLocalStorage = (productId) => {
  const localCart = JSON.parse(localStorage.getItem("cart")) || {};
  delete localCart[productId];
  localStorage.setItem("cart", JSON.stringify(localCart));
};

export const editQtyInLocalStorage = (productId, qty) => {
  const localCart = JSON.parse(localStorage.getItem("cart")) || {};
  localCart[productId] = qty;
  localStorage.setItem("cart", JSON.stringify(localCart));
};

export const fetchCart = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}/cart`);
    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }
    const cart = await response.json();
    return cart;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const addItemToBackend = async (orderId, productId) => {
  try {
    const response = await fetch(
      `/api/order_products/${orderId}/${productId}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add item");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const editQtyInBackend = async (orderId, productId, qty) => {
  try {
    const response = await fetch(
      `/api/order_products/${orderId}/${productId}/${qty}`,
      {
        method: "PATCH",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to edit quantity");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const removeItemFromBackend = async (orderId, productId) => {
  try {
    const response = await fetch(
      `/api/order_products/${orderId}/${productId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove item");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
