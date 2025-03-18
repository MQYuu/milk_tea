const express = require('express');
const router = express.Router();

const {
    getUsers,
    createUser,
    getUserByID,
    updateUser,
    deleteUser
} = require("../controller/userController");

router.route("/")
    .get(getUsers)
    .post(createUser)
router.route("/:id")
    .get(getUserByID)
    .put(updateUser)
    .delete(deleteUser) 

module.exports = router;