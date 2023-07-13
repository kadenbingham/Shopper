const client = require("./client");
const { User, Product, Order_Product, Order } = require("./models");
const { users, products, order_products } = require("./seedData");

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
      isCart BOOLEAN DEFAULT false 
    )
    `);

    await client.query(`
    CREATE TABLE orders_products(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        qty INTEGER,
        price,
        UNIQUE("productId", "orderId")
      `);
  } catch (error) {
    console.log(error);
  }
}

async function populateTables() {
  console.log("Populating tables");
  try {
    const createdUsers = await Promise.all(users.map(User.createUser));
    console.log("users created!");

    console.log("products");
    const createdProduct = await Promise.all(
      products.map(Product.createProduct)
    );
    console.log("products created!");

    console.log("cart items");
    const createdCarts = await Promise.all(
      createdUsers.map((user) => {
        return Order.createCartByUserId(user.id);
      })
    );
    console.log("cart items created!");

    console.log("orders");
    const createdOrderProducts = await Promise.all(
      order_products.map(Order_Product.addToCart)
    );
    console.log("orders created!");
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
    console.log("success:");
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb().then(() => client.end());
