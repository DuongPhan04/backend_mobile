const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// Get cart by userId
// Sửa đoạn code trong route GET "/:userId"
// Trong cartRoutes.js, sửa route get cart:
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "items.productId",
      "name price image"
    ); // Thêm các field khác nếu cần

    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi server khi lấy giỏ hàng", error: err.message });
  }
});

// Add item to cart
router.post("/add", async (req, res) => {
  const { userId, productId, size, quantity, price } = req.body;

  if (!userId || !productId || quantity == null || price == null) {
    return res.status(400).json({ message: "Thiếu dữ liệu đầu vào" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId.toString() &&
          item.size === (size || "default")
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({
          productId,
          size: size || "default",
          quantity,
          price,
        });
      }
      cart.updatedAt = new Date();
      await cart.save();
      await cart.populate("items.productId", "name price image"); // <-- populate sau khi save
    } else {
      cart = await Cart.create({
        userId,
        items: [{ productId, size: size || "default", quantity, price }],
      });
      await cart.populate("items.productId", "name price image"); // <-- populate sau khi tạo
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({
      message: "Lỗi khi thêm sản phẩm vào giỏ hàng",
      error: err.message,
    });
  }
});

// Remove item from cart
router.post("/remove", async (req, res) => {
  const { userId, productId, size } = req.body; // Thêm size vào destructuring

  if (!userId || !productId) {
    return res.status(400).json({ message: "Thiếu dữ liệu đầu vào" });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    const productIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId.toString() &&
        item.size === (size || "default") // Thêm điều kiện kiểm tra size
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Sản phẩm không có trong giỏ hàng" });
    }

    cart.items.splice(productIndex, 1);
    cart.updatedAt = new Date();
    await cart.save();

    // Thêm populate sau khi save để cập nhật thông tin sản phẩm
    await cart.populate("items.productId", "name price image");

    res.json(cart);
  } catch (err) {
    res.status(500).json({
      message: "Lỗi khi xoá sản phẩm khỏi giỏ hàng",
      error: err.message,
    });
  }
});

// Update quantity of an item in the cart
router.put("/update", async (req, res) => {
  const { userId, productId, size, quantity } = req.body;

  if (!userId || !productId || quantity == null) {
    return res.status(400).json({ message: "Thiếu dữ liệu đầu vào" });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId.toString() &&
        item.size === (size || "default")
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
    }

    cart.items[itemIndex].quantity = quantity;
    cart.updatedAt = new Date();
    await cart.save();
    await cart.populate("items.productId", "name price image");

    res.json(cart);
  } catch (err) {
    res.status(500).json({
      message: "Lỗi khi cập nhật số lượng sản phẩm",
      error: err.message,
    });
  }
});

module.exports = router;
