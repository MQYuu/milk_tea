const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng nhập người dùng
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error('Email không đúng hoặc người dùng chưa đăng ký');
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401);
        throw new Error('Mật khẩu không đúng');
    }

    // Tạo JWT token
    const token = jwt.sign(
        { userId: user._id, isAdmin: user.isAdmin },  // Payload
        process.env.JWT_SECRET,  // Bí mật JWT từ file .env
        { expiresIn: '30d' }  // Thời gian hết hạn
    );

    // Trả về thông tin người dùng và token
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token  // Trả về token cho client
    });
});

// Lấy danh sách người dùng (chỉ dành cho admin)
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password'); // Không trả về mật khẩu
    res.status(200).json(users);
});

// Tạo người dùng mới
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('Email đã được sử dụng');
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error('Không thể tạo người dùng');
    }
});

// Lấy thông tin người dùng theo ID
const getUserByID = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('Không tìm thấy người dùng');
    }
});

// Cập nhật thông tin người dùng
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('Không tìm thấy người dùng');
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin ?? user.isAdmin;

    // Nếu có mật khẩu mới, mã hóa lại trước khi lưu
    if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.status(200).json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
    });
});

// Xóa người dùng theo ID
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('Không tìm thấy người dùng');
    }

    await user.deleteOne();
    res.status(200).json({ message: 'Người dùng đã bị xóa' });
});

module.exports = { getUsers, createUser, getUserByID, updateUser, deleteUser, loginUser };
