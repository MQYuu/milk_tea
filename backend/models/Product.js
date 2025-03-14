const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, 
        required: [true, "Vui lòng thêm tên sản phẩm!"] 
        },
        price: { type: Number, 
        required: [true, "Vui lòng thêm giá sản phẩm!"] 
        },
        description: { type: String,
        required: [true, "Vui lòng thêm mô tả sản phẩm!"]
        },
        imageUrL: { type: String,
        required: [true, "Vui lòng thêm ảnh sản phẩm!"]
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);
