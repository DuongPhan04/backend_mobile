const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // đường dẫn đến model sản phẩm

// Lấy toàn bộ sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // hoặc thêm .populate() nếu cần
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm" });
  }
});

module.exports = router;
