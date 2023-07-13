const client = require("../client");

async function getAllCartItems() {
  const { rows } = await client.query(`
    SELECT *
    FROM cart_items
    `);
  return rows;
}

async function deleteCartItem(orderID) {
  try {
    const {
      rows: [cart_item],
    } = await client.query(
      `
        DELETE FROM cart_items
        WHERE id = $1
        RETURNING *;
        `,
      [orderID]
    );
    return cart_item;
  } catch (error) {
    throw error;
  }
}

async function createCartItem({ price, product_id, orderID, quantity }) {
  try {
    const {
      rows: [cart_item],
    } = await client.query(
      `
        INSERT INTO cart_items(orderID, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [orderID, product_id, quantity, price]
    );
    return cart_item;
  } catch (error) {
    throw error;
  }
}

async function editCartItem(orderID, product_id, quantity) {
  try {
    const {
      rows: [cart_item],
    } = await client.query(
      `
      UPDATE cart_items
      SET quantity = $1
      WHERE orderID = $2 AND product_id = $3
      RETURNING *;
      `,
      [quantity, orderID, product_id]
    );
    return cart_item;
  } catch (error) {
    throw error;
  }
}
