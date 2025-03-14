const express = require('express');
const router = express.Router();

const {
    getProduct,
    createProduct,
    getProductByID,
    updateProduct,
    deleteProduct
} = require("../controller/productController");

router.route("/")
    .get(getProduct)
    .post(createProduct)
router.route("/:id") 
    .get(getProductByID)
    .put(updateProduct)
    .delete(deleteProduct)

module.exports = router;  