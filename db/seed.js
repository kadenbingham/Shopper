const rebuildDb = require("./rebuildDb");
const client = require("./client");
const { createUser } = require("./adapters/users");
const { createProduct } = require("./adapters/products");
const { createOrders } = require("./adapters/orders");
const { createCartItem } = require("./adapters/cart");

const { users, products, orders, cartItems } = require("./seedData");

async function dropTables() {
  console.log("Dropping tables");
  try {
    await client.query(`
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);
  } catch (error) {
    console.error(error);
  }
}

async function createTables() {
  console.log("Creating tables");
  try {
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT,
        price INTEGER,
        stockQty INTEGER,
        category TEXT
      )
    `);

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        adress TEXT,
        isAdmin BOOLEAN DEFAULT false
      )
    `);

    await client.query(`
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      userID INTEGER REFERENCES users(id),
      total_price INTEGER,
      status BOOLEAN DEFAULT false 
    )
    `);

    await client.query(`
        CREATE TABLE cartItems (
          id SERIAL PRIMARY KEY,
          orderID INTEGER REFERENCES orders(id), 
          product_id INTEGER REFERENCES products(id),
          quantity INTEGER,
          price INTEGER,
          UNIQUE("productId", "orderId")
        )
      `);
  } catch (error) {
    console.log(error);
  }
}

async function populateTables() {
  console.log("Populating tables");
  try {
    console.log("users");
    for (const user of users) {
      console.log("Users:", users);
      await createUser(user);
    }
    console.log("users created!");

    console.log("products");
    for (const product of products) {
      console.log("Product:", product);
      await createProduct(product);
    }
    console.log("products created!");

    console.log("orders");
    for (const order of orders) {
      console.log("Order:", order);
      await createOrders(order);
    }
    console.log("orders created!");

    console.log("cart items");
    for (const cartItem of cartItems) {
      console.log("Cart Item:", cartItem);
      await createCartItem(cartItem);
    }
    console.log("cart items created!");
  } catch (error) {
    console.error(error);
  }
}

async function rebuildDb() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await populateTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb();
