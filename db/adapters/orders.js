const client = require("../client");

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

async function getOrderById(orderID) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      SELECT *
      FROM orders
      WHERE id=$1;
      `,
      [orderID]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function updateOrder(orderID, { name, total_price, status }) {
  try {
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
      [name, total_price, status, orderID]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function createOrders({ userID, name, total_price, status }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders(userID, name, total_price, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [userID, name, total_price, status]
    );
    return order;
  } catch (error) {
    throw error;
  }
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

async function deleteOrder(orderID) {
  try {
    const {
      rows: [deletedOrder],
    } = await client.query(
      `
      DELETE FROM orders
      WHERE id = $1
      RETURNING *;
      `,
      [orderID]
    );
    await client.query(
      `
    DELETE FROM cart_items
    WHERE orderID = $1;
    `,
      [orderID]
    );
    return deletedOrder;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  updateOrder,
  deleteOrder,
  createOrders,
  getAllOrders,
  getOrderById,
  createCartByUserId,
};
