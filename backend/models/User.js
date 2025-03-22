const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, 
        required: [true, "Vui lòng thêm tên người dùng!"] 
        },
        email: { type: String, 
        required: [true, "Vui lòng thêm email người dùng!"] 
        },
        password: { type: String,
        required: [true, "Vui lòng thêm mật khẩu người dùng!"]
        },
        avatar: { type: String,
        default: ""
        },
        isAdmin: { type: Boolean,
        required: true,
        default: false
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);