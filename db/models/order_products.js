const client = require("../client");

async function getAllCartItems() {
  const { rows } = await client.query(`
    SELECT *
    FROM orders_products
    `);
  return rows;
}

async function createCartByUserId(userId) {
  const {
    rows: [cart],
  } = await client.query(
    `
            INSERT INTO orders(user_id)
                    VALUES($1)
                    RETURNING * 
            `,
    [userId]
  );
  return cart;
}

async function deleteCartItem({ productId, orderId }) {
  const {
    rows: [op],
  } = await client.query(
    `
              DELETE FROM orders_products as op
              WHERE op.product_id=$1 and op.order_id=$2
              RETURNING *
      `,
    [productId, orderId]
  );

  return op;
}

async function createCartItem({ price, product_id, orderID, quantity }) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
        INSERT INTO orders_products (order_id, product_id, qty, price)
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
  const {
    rows: [order_product],
  } = await client.query(
    `
      UPDATE orders_products
      SET quantity = $1
      WHERE orderID = $2 AND product_id = $3
      RETURNING *;
      `,
    [quantity, orderID, product_id]
  );
  return order_product;
}
async function addToCart({ productId, orderId, qty = 1 }) {
  const {
    rows: [order_product],
  } = await client.query(
    `
          INSERT INTO orders_products(product_id, order_id, qty)
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
