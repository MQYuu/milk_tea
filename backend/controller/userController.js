const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log("Yêu cầu đăng nhập:", email, password); // Kiểm tra dữ liệu nhận được

    if (!email || !password) {
        console.log("Lỗi: Thiếu email hoặc password");
        res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
        return;
    }

    const user = await User.findOne({ email });
    if (!user) {
        console.log("Lỗi: Không tìm thấy user");
        res.status(401).json({ message: "Email không đúng hoặc người dùng chưa đăng ký" });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log("Lỗi: Sai mật khẩu");
        res.status(401).json({ message: "Mật khẩu không đúng" });
        return;
    }

    const token = jwt.sign(
        { userId: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );

    console.log("Đăng nhập thành công, tạo token:", token);
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token
    });
});

const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        if (!userId || !oldPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập đủ thông tin!" });
        }

        // Tìm user trong database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng!" });
        }

        // Kiểm tra mật khẩu cũ
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Mật khẩu cũ không đúng!" });
        }

        // Mã hóa mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Lưu vào database
        await user.save();

        res.status(200).json({ success: true, message: "Đổi mật khẩu thành công!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server!", error: error.message });
    }
};


// Lấy danh sách người dùng (chỉ dành cho admin)
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password'); // Không trả về mật khẩu
    res.status(200).json(users);
});

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'Email đã được sử dụng' }); // ✅ Trả về JSON
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
        return res.status(400).json({ message: 'Không thể tạo người dùng' }); // Trả về JSON
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

module.exports = { getUsers, createUser, getUserByID, updateUser, deleteUser, loginUser, changePassword };
