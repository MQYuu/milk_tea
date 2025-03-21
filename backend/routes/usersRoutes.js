const express = require('express');
const router = express.Router();

const {
    loginUser,
    getUsers,
    createUser,
    getUserByID,
    updateUser,
    deleteUser,
    changePassword
} = require("../controller/userController");

router.route("/")
    .get(getUsers)
router.route("/register")
    .post(createUser)
router.route("/:id")
    .get(getUserByID)
    .put(updateUser)
    .delete(deleteUser) 
router.post("/login", loginUser);
router.post("/change-password", changePassword);

module.exports = router;