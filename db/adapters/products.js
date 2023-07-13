const client = require("../client");

async function getProductsById(id) {
  const {
    rows: [product],
  } = await client.query(`
    SELECT *
    FROM products
    WHERE id =${id}
    `);
  if (!product) {
    return null;
  }
  return product;
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM products;
      `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
          DELETE FROM products
          WHERE id = $1
          RETURNING *;
        `,
      [productId]
    );

    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    throw error;
  }
}

async function createProduct({ name, description, price, stockQty }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products(name, description, price, stockQty)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [name, description, price, stockQty]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(
  productId,
  { name, description, image, price, stockQty, category }
) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        UPDATE products
        SET name = $1,
            description = $2,
            image =$3
            price = $4,
            stockQty = $5,
            category = $6
        WHERE id = $7
        RETURNING *;
      `,
      [name, description, image, price, stockQty, category, productId]
    );

    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getProductsById,
  updateProduct,
  getAllProducts,
  createProduct,
  deleteProduct,
};
