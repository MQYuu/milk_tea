const multer = require("multer");
const path = require("path");

// Cấu hình nơi lưu trữ và tên file ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ảnh sẽ lưu vào thư mục "uploads/"
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Đổi tên file tránh trùng
    }
});

// Kiểm tra định dạng file (chỉ chấp nhận ảnh)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Chỉ cho phép upload file JPG, JPEG, PNG!"), false);
    }
};

// Khởi tạo multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // Giới hạn 2MB
});

module.exports = upload;
