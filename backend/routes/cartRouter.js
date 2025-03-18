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
    .post(addToCart)
    .put(updateCart)
    .delete(clearCart)
router.route("/:userId/:productId")
    .delete(removeFromCart)

module.exports = router;