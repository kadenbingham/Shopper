const router = require("express").Router();
const { Order, User } = require("../db/models");

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.getUserById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/cart", async (req, res, next) => {
  try {
    const cart = await Order.getCartByUserId(req.params.id);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
