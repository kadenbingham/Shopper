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

async function createProduct({ name, description, price, stock_qty }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products(name, description, price, stock_qty)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [name, description, price, stock_qty]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(
  product_id,
  { name, description, image, price, stock_qty, category }
) {
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
    [name, description, image, price, stock_qty, category, product_id]
  );

  if (!product) {
    return null;
  }

  return product;
}

module.exports = {
  getProductsById,
  updateProduct,
  getAllProducts,
  createProduct,
  deleteProduct,
};
