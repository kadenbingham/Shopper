const router = require("express").Router();

const { Product } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.getAllProducts();
    res.send(allProducts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.getProductById(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const searchKeyword = req.query.q; // Get the search keyword from the query parameter 'q'
    if (!searchKeyword) {
      return res.status(400).json({ message: "Search keyword not provided." });
    }

    const searchResults = await Product.searchProducts(searchKeyword); // Add a function in the Product model to search products by keyword
    res.send(searchResults);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
