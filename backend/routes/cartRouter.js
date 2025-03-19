const express = require('express');
const router = express.Router();

const {
    getCart,
    addToCart,
    removeFromCart,
    updateCart,
    clearCart
} = require("../controller/cartController");

router.route("/:userId")
    .get(getCart)
    .delete(clearCart)
router.route("/:userId/:productId")
    .delete(removeFromCart)
router.post("/add", addToCart);
router.put("/update", updateCart);

module.exports = router;