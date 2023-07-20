const router = require("express").Router();
const { Order_Product } = require("../db/models");

router.post("/:orderId/:productId", async (req, res, next) => {
  try {
    const { orderId, productId } = req.params;
    const addedProductToCart = await Order_Product.addToCart({
      productId,
      orderId,
    });
    res.send(addedProductToCart);
  } catch (error) {
    next(error);
  }
});

router.patch("/:orderId/:productId/:qty", async (req, res, next) => {
  try {
    const { orderId, productId, qty } = req.params;
    const updatedProductInCart = await Order_Product.updateQtyInCart({
      productId,
      orderId,
      qty,
    });
    res.send(updatedProductInCart);
  } catch (error) {
    next(error);
  }
});

router.delete("/:orderId/:productId", async (req, res, next) => {
  try {
    const { orderId, productId } = req.params;
    const deletedProductFromCart = await Order_Product.removeFromCart({
      productId,
      orderId,
    });
    res.send(deletedProductFromCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
