const router = require("express").Router();

router.use("/products", require("./products"));
router.use("/auth", require("./auth"));

// GET /api/health
router.get("/health", (req, res, next) => {
  res.send({
    message: "Api is up and healthy!",
  });
});

module.exports = router;
