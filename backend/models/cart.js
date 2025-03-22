const mongoose = require("mongoose");

///Thông tin sản phẩm trong giỏ hàng
const CartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

//Thông tin userID và giỏ hàng của userId đó 
const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);
