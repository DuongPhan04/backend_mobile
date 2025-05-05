const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String }, // Thêm dòng này
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
});

module.exports = mongoose.model("User", userSchema);
