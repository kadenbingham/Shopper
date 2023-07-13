const client = require("../client");

async function getAllCartItems() {
  const { rows } = await client.query(`
    SELECT *
    FROM order_products
    `);
  return rows;
}
async function createCartByUserId(userId) {
  const {
    rows: [cart],
  } = await client.query(
    `
            INSERT INTO orders("userId")
                    VALUES($1)
                    RETURNING * 
            `,
    [userId]
  );
  return cart;
}

async function deleteCartItem({ productId, orderId }) {
  console.log("before query");
  const {
    rows: [op],
  } = await client.query(
    `
          DELETE FROM order_products as op
              WHERE op."productId"=$1 and op."orderId"=$2
              RETURNING *
      `,
    [productId, orderId]
  );
  console.log("order prod", op);
  return op;
}

async function createCartItem({ price, product_id, orderID, quantity }) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
        INSERT INTO order_products (orderID, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [orderID, product_id, quantity, price]
    );
    return order_product;
  } catch (error) {
    throw error;
  }
}

async function editCartItem(orderID, product_id, quantity) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
      UPDATE order_products
      SET quantity = $1
      WHERE orderID = $2 AND product_id = $3
      RETURNING *;
      `,
      [quantity, orderID, product_id]
    );
    return order_product;
  } catch (error) {
    throw error;
  }
}
async function addToCart({ productId, orderId, qty = 1 }) {
  const {
    rows: [order_product],
  } = await client.query(
    `
          INSERT INTO order_products("productId", "orderId", qty)
              VALUES($1, $2, $3)
              RETURNING * 
          `,
    [productId, orderId, qty]
  );

  return order_product;
}

module.exports = {
  createCartItem,
  deleteCartItem,
  editCartItem,
  getAllCartItems,
  createCartByUserId,
  addToCart,
};
