const router = require("express").Router();
const { authRequired } = require("./utils");

router.get("/health", (req, res, next) => {
  res.send("API is healthy and ready to go!");
});
router.use("/auth", require("./auth"));

router.use("/users", require("./users"));

router.use("/products", require("./products"));

//router.use("/orders", require("./orders"));

router.use("/orders_products", require("./orders_products"));

module.exports = router;
