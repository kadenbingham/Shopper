const router = require("express").Router();
const client = require("../db/client");

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const { rows } = await client.query(`
      select name from products
    `);
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
