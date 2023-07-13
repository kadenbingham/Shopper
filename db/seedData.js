// Create some seed data and export it from this file
const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    image_url: "https://example.com/product1.jpg",
    price: 10,
    stock_qty: 100,
    category: "Category 1",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description for Product 2",
    image_url: "https://example.com/product2.jpg",
    price: 20,
    stock_qty: 50,
    category: "Category 2",
  },
];

const orders = [
  {
    id: 1,
    user_id: 1,
    total_price: 100,
    status: false,
  },
  {
    id: 2,
    user_id: 2,
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
    is_admin: false,
  },
  {
    id: 2,
    username: "user2",
    password: "password2",
    address: "456 Jacks Rd, City",
    is_admin: true,
  },
];
const order_products = [
  {
    id: 1,
    order_id: 1001,
    product_id: 101,
    quantity: 2,
    price: 10,
  },
  {
    id: 2,
    order_id: 1001,
    product_id: 102,
    quantity: 1,
    price: 15,
  },
  {
    id: 3,
    order_id: 1002,
    product_id: 103,
    quantity: 4,
    price: 8,
  },
  {
    id: 4,
    order_id: 1002,
    product_id: 104,
    quantity: 3,
    price: 12,
  },
  {
    id: 5,
    order_id: 1003,
    product_id: 105,
    quantity: 1,
    price: 20,
  },
];
module.exports = { users, products, orders, order_products };
