const Product = require("../model/userprod");
const uploadImage = require("../middleware/uploadImages");

// CREATE (POST) product with multiple images
const addProduct = async (req, res) => {
  try {
    const { name, description, price, userId, quantity, category } = req.body;

    // Store uploaded image filenames
    const images = req.files ? req.files.map(file => file.filename) : [];

    const newProduct = new Product({
      name,
      description,
      price,
      userId: Number(userId),
      quantity: Number(quantity) || 1,
      category: category || "",
      images
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

// READ all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// READ products by userId
const getUserProducts = async (req, res) => {
  try {
    const { userId } = req.params;
    const products = await Product.find({ userId: Number(userId) });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user's products" });
  }
};

// UPDATE product by ID (optional: update images)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, category } = req.body;

    const updatedData = {
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
      category
    };

    // Update images if new files uploaded
    if (req.files && req.files.length > 0) {
      updatedData.images = req.files.map(file => file.filename);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// DELETE product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getUserProducts,
  updateProduct,
  deleteProduct
};
