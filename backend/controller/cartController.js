const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');

// Lấy giỏ hàng của người dùng
const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, items: [] });
});

// Thêm sản phẩm vào giỏ hàng
const addToCart = asyncHandler(async (req, res) => {
    const { userId, productId, name, price } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({ productId, name, price, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
});

// Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = asyncHandler(async (req, res) => {
    const { userId, productId } = req.params;
    let cart = await Cart.findOne({ userId });

    if (cart) {
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
    }

    res.json(cart);
});

// Cập nhật số lượng sản phẩm
const updateCart = asyncHandler(async (req, res) => {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId
});

    if (cart) {
        const item = cart.items.find(item => item.productId.toString() === productId);
        if (item) {
            item.quantity = quantity;
            await cart.save();
        }
    }
});

// Xóa toàn bộ giỏ hàng
const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOneAndDelete({ userId: req.params.userId });
    res.json(cart);
});

// Export các hàm xử lý
module.exports = { getCart, addToCart, removeFromCart, updateCart, clearCart };