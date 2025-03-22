const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");

const {
    loginUser,
    getUsers,
    createUser,
    getUserByID,
    updateUser,
    deleteUser,
    changePassword,
    uploadAvatar
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
router.post("/upload-avatar/:id", upload.single("avatar"), uploadAvatar);

module.exports = router;