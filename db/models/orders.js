const client = require("../client");

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

async function getOrderById(id) {
  const {
    rows: [order],
  } = await client.query(
    `
      SELECT *
      FROM orders
      WHERE id=$1;
      `,
    [id]
  );
  return order;
}

async function updateOrder(id, { name, total_price, status }) {
  console.log("...updating orders");
  const {
    rows: [order],
  } = await client.query(
    `
        UPDATE orders
        SET name = $1, total_price = $2, status = $3
        WHERE id = $4
        RETURNING *;
        `,
    [name, total_price, status, id]
  );
  return order;
}

async function createOrders({ user_id, name, total_price, status }) {
  const {
    rows: [order],
  } = await client.query(
    `
        INSERT INTO orders(user_id, name, total_price, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
    [user_id, name, total_price, status]
  );
  return order;
}

async function getAllOrders() {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM orders;
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function deleteOrder(order_id) {
  await client.query(
    `
        DELETE FROM orders_products
        WHERE orderID = $1;
    `,
    [order_id]
  );

  const {
    rows: [deletedOrder],
  } = await client.query(
    `
        DELETE FROM orders
        WHERE id = $1
        RETURNING *;
      `,
    [order_id]
  );

  return deletedOrder;
}

module.exports = {
  updateOrder,
  deleteOrder,
  createOrders,
  getAllOrders,
  getOrderById,
  createCartByUserId,
};
