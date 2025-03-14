const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// Get all products
const getProduct = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
})

// Create product
const createProduct = asyncHandler(async (req, res) => {
    const products = req.body;

    // Kiểm tra xem có sản phẩm hay không
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Vui lòng nhập ít nhất 1 sản phẩm!" });
    }

    // Kiểm tra dữ liệu hợp lệ
    const invalidProducts = products.filter(product => 
        !product.name || !product.price || !product.description || !product.image ||
        typeof product.price !== 'number' || product.price <= 0
    );

    // Nếu có sản phẩm không hợp lệ
    if (invalidProducts.length > 0) {
        return res.status(400).json({ message: "Có sản phẩm thiếu thông tin hoặc giá không hợp lệ, vui lòng kiểm tra lại!" });
    }

    // Thêm tất cả sản phẩm vào DB
    const createdProducts = await Product.insertMany(products);

    res.status(201).json({
        message: `Đã thêm ${createdProducts.length} sản phẩm thành công!`,
        products: createdProducts
    });
});

module.exports = {
    getProduct,
    createProduct,
};
