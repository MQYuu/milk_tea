const asyncHandler = require('express-async-handler');
const Product = require('../models/product');

// Get all products
const getProduct = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products); 
})

// Tạo sản phẩm mới
// Tạo sản phẩm mới hoặc mảng sản phẩm
const createProduct = asyncHandler(async (req, res) => {
    // Lấy dữ liệu từ body yêu cầu
    const products = req.body; // có thể là 1 sản phẩm hoặc 1 mảng sản phẩm

    try {
        // Kiểm tra nếu body chứa mảng sản phẩm
        if (Array.isArray(products)) {
            // Nếu là mảng, tạo nhiều sản phẩm
            const createdProducts = [];
            for (let productData of products) {
                const { name, price, description, imageUrl } = productData;

                const product = new Product({
                    name,
                    price,
                    description,
                    imageUrl
                });

                const createdProduct = await product.save();
                createdProducts.push(createdProduct);
            }

            // Trả về kết quả khi tạo nhiều sản phẩm
            res.status(201).json({
                message: 'Các sản phẩm đã được tạo thành công!',
                products: createdProducts
            });

        } else {
            // Nếu chỉ là 1 sản phẩm, tạo sản phẩm bình thường
            const { name, price, description, imageUrl } = products;

            const product = new Product({
                name,
                price,
                description,
                imageUrl
            });

            // Lưu sản phẩm vào cơ sở dữ liệu
            const createdProduct = await product.save();

            // Trả về kết quả thành công
            res.status(201).json({
                message: 'Sản phẩm đã được tạo thành công!',
                product: createdProduct
            });
        }

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
    const {name, price, description, imageUrl} = req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.imageUrl = imageUrl;
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