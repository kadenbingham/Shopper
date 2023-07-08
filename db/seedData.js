// Create some seed data and export it from this file
const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    imageUrl: "https://example.com/product1.jpg",
    price: 10,
    stockQty: 100,
    category: "Category 1",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description for Product 2",
    imageUrl: "https://example.com/product2.jpg",
    price: 20,
    stockQty: 50,
    category: "Category 2",
  },
];

const orders = [
  {
    id: 1,
    userID: 1,
    total_price: 100,
    status: false,
  },
  {
    id: 2,
    userID: 2,
    total_price: 75,
    status: true,
  },
];

const users = [
  {
    id: 1,
    username: "user1",
    password: "password1",
    address: "123 Main St, City",
    isAdmin: false,
  },
  {
    id: 2,
    username: "user2",
    password: "password2",
    address: "456 Jacks Rd, City",
    isAdmin: true,
  },
];
const cartItems = [
  {
    id: 1,
    orderID: 1001,
    product_id: 101,
    quantity: 2,
    price: 10,
  },
  {
    id: 2,
    orderID: 1001,
    product_id: 102,
    quantity: 1,
    price: 15,
  },
  {
    id: 3,
    orderID: 1002,
    product_id: 103,
    quantity: 4,
    price: 8,
  },
  {
    id: 4,
    orderID: 1002,
    product_id: 104,
    quantity: 3,
    price: 12,
  },
  {
    id: 5,
    orderID: 1003,
    product_id: 105,
    quantity: 1,
    price: 20,
  },
];

module.exports = { users, products, cartItems, orders };
