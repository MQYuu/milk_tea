const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
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
        imageUrl: { type: String,
        required: [true, "Vui lòng thêm ảnh sản phẩm!"]
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema)