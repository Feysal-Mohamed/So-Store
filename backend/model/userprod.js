const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  userId: { type: Number, required: true },
  images: [{ type: String }],
  status: { type: String, enum: ["Available", "Out of Stock"], default: "Available" },
  createdAt: { type: Date, default: Date.now }
});

// Automatically update status based on quantity when saving
productSchema.pre("save", function (next) {
  this.status = this.quantity > 0 ? "Available" : "Out of Stock";
  next();
});

// Automatically update status based on quantity when updating
productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.quantity !== undefined) {
    update.status = update.quantity > 0 ? "Available" : "Out of Stock";
    this.setUpdate(update);
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
