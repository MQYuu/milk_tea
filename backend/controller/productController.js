const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');


// Get all products
const getProduct = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
})

// Tạo sản phẩm mới
const createProduct = asyncHandler(async (req, res) => {
    // Lấy dữ liệu từ body yêu cầu
    const { name, price, description, imageUrL } = req.body;

    try {
        // Tạo sản phẩm mới
        const product = new Product({
            name,
            price,
            description,
            imageUrL
        });

        // Lưu sản phẩm vào cơ sở dữ liệu
        const createdProduct = await product.save();

        // Trả về kết quả thành công
        res.status(201).json({
            message: 'Sản phẩm đã được tạo thành công!',
            product: createdProduct
        });
    } catch (error) {
        // Xử lý lỗi và hiển thị chi tiết lỗi
        console.error(error);
        res.status(500).json({
            message: 'Đã có lỗi xảy ra khi tạo sản phẩm',
            error: error.message
        });
    }
    
});

// Lấy sản phẩm theo ID
const getProductByID = asyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404).json({message: "Không tìm thấy sản phẩm"});
    }
})

// Cập nhật thông tin sản phẩm
const updateProduct = asyncHandler(async (req, res) =>{
    const {name, price, description, imageUrL} = req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.imageUrL = imageUrL;
        const updateProduct = await product.save();
        res.json(updateProduct);
    }
});

// Xóa sản phẩm
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await Product.deleteOne({ _id: req.params.id });  // Sử dụng deleteOne thay vì product.remove
        res.json({ message: "Sản phẩm đã được xóa" });
    } else {
        res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
});



module.exports = {
    getProduct,
    createProduct,
    getProductByID,
    updateProduct,
    deleteProduct
};
