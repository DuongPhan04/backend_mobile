const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        size: { type: String, default: "default" }, // Mặc định nếu không có size
        quantity: { type: Number, required: true, default: 1, min: 1 }, // Giới hạn quantity >= 1
        price: { type: Number, required: true }, // Bắt buộc để đảm bảo giá trị
      },
    ],
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

module.exports = mongoose.model("Cart", cartSchema);
