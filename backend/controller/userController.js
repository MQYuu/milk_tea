const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Get all users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
})

// Create a new user
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    const user = await User.create({ name, email, password, isAdmin });
    res.status(201).json(user);
})

// Get user by ID
const getUserByID = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

// Update user by ID
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.isAdmin = req.body.isAdmin || user.isAdmin;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Delete user by ID
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = { getUsers, createUser, getUserByID, updateUser
, deleteUser };