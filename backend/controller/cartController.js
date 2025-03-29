const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');
const User = require('../models/user');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//Lấy giỏ hàng
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'User ID không hợp lệ' });
        }

        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Không có giỏ hàng nào!' });
        }

        // Debug: Kiểm tra các item trong giỏ hàng
        //console.log("Giỏ hàng của người dùng: ", cart);

        // Tạo ra một danh sách các sản phẩm trong giỏ hàng với đủ thông tin
        const cartItems = await Promise.all(cart.items.map(async (item) => {
            // Debug: Kiểm tra giá trị của productId trong item
            //console.log("Đang xử lý item:", item);
            //console.log("productId trong item:", item.productId);

            const product = await Product.findById(item.productId);

            if (!product) {
                //console.log(`Sản phẩm với ID ${item.productId} không tồn tại.`);
                return null;  // Nếu sản phẩm không tồn tại, trả về null hoặc có thể bỏ qua
            }

            return {
                productId: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: item.quantity,
            };
        }));

        // Lọc ra các sản phẩm hợp lệ (tránh null nếu không tìm thấy sản phẩm)
        const validCartItems = cartItems.filter(item => item !== null);

        res.json({ items: validCartItems });
    } catch (error) {
        //console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy giỏ hàng' });
    }
};

const addToCart = asyncHandler(async (req, res) => {
    const { userId, items } = req.body;

    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Dữ liệu giỏ hàng không hợp lệ!" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    items.forEach(({ productId, name, price, quantity, imageUrl }) => {
        if (!productId || !name || !price || !quantity) return;

        const existingItem = cart.items.find(item => item.productId?.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productId: new ObjectId(productId), // Ép thành ObjectId
                name,
                price,
                quantity,
                imageUrl
            });
        }
    });

    await cart.save();
    res.json(cart);
});

const removeFromCart = asyncHandler(async (req, res) => {
    const { userId, productId } = req.params;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        //console.log('Giỏ hàng không tồn tại');
        return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    // Kiểm tra productId hợp lệ
    //console.log('productId từ request:', productId);
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        //console.log('productId không hợp lệ:', productId);
        return res.status(400).json({ message: "Product ID không hợp lệ" });
    }

    // Kiểm tra giỏ hàng trước khi xóa
    // console.log('Trước khi xóa, giỏ hàng hiện tại:', cart.items);

    // So sánh productId mà không dùng toString()
    cart.items = cart.items.filter(item => {
        // Kiểm tra xem item.productId có phải là ObjectId hợp lệ và so sánh với productId từ request
        if (item.productId && mongoose.Types.ObjectId.isValid(item.productId)) {
            // So sánh ObjectId trực tiếp mà không dùng toString()
            const productIdFromItem = item.productId;
            const isMatching = productIdFromItem.equals(new mongoose.Types.ObjectId(productId));
            //console.log('So sánh:', productIdFromItem, 'với', productId, '-> Kết quả:', isMatching);
            return !isMatching; // Loại bỏ item nếu match
        } else {
            //console.log('Sản phẩm có productId không hợp lệ hoặc undefined:', item);
            return true;  // Nếu productId không hợp lệ, giữ lại item đó
        }
    });

    // Nếu giỏ hàng không còn sản phẩm, xóa giỏ hàng
    if (cart.items.length === 0) {
        //console.log('Giỏ hàng đã trống, xóa giỏ hàng');
        await cart.deleteOne(); // Xóa giỏ hàng nếu không còn sản phẩm
        return res.json({ message: "Giỏ hàng đã trống và đã được xóa" });
    }

    await cart.save();
    //console.log('Giỏ hàng sau khi xóa sản phẩm:', cart.items);
    res.json(cart);
});

// Cập nhật số lượng sản phẩm
const updateCart = asyncHandler(async (req, res) => {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    const item = cart.items.find(item => item.productId && item.productId.toString() === productId);

    if (item) {
        item.quantity = quantity;
        await cart.save();
        res.json(cart);
    } else {
        res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
    }
});

// Xóa toàn bộ giỏ hàng
const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOneAndDelete({ userId: req.params.userId });
    if (cart) {
        res.json({ message: "Giỏ hàng đã được xóa" });
    } else {
        res.status(404).json({ message: "Không tìm thấy giỏ hàng của người dùng" });
    }
});

// Export các hàm xử lý
module.exports = { getCart, addToCart, removeFromCart, updateCart, clearCart };
