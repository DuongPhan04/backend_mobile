const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Đăng ký
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Thiếu email hoặc password" });
    }

    const existingUser = await User.findOne({ username: email });
    if (existingUser) {
      return res.status(409).json({ message: "Email đã được sử dụng" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username: email, // Lưu email vào trường username
      password: hashedPassword,
      avatar,
    });

    await newUser.save();

    res.status(201).json({
      message: "Đăng ký thành công",
      user: {
        _id: newUser._id, // Trả về _id
        name: newUser.name,
        username: newUser.username,
        avatar: newUser.avatar,
      },
    });
  } catch (err) {
    console.error("Đăng ký lỗi:", err);
    res.status(500).json({ message: "Lỗi server khi đăng ký" });
  }
});

// Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Thiếu email hoặc password" });
    }

    const user = await User.findOne({ username: email });
    if (!user) {
      return res.status(404).json({ message: "Email chưa được đăng ký" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    res.json({
      message: "Đăng nhập thành công",
      user: {
        _id: user._id, // Trả về _id
        username: user.username,
        name: user.name,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error("Đăng nhập lỗi:", err);
    res.status(500).json({ message: "Lỗi server khi đăng nhập" });
  }
});

module.exports = router;
