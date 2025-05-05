// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  rating: Number,
  type: String,
  sizes: [String],
});

module.exports = mongoose.model("Product", productSchema);
