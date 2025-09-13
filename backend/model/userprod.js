const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  userId: { type: Number, required: true },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

// Important: use module.exports in CommonJS
module.exports = mongoose.model("Product", productSchema);
