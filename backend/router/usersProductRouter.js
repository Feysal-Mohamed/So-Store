const express = require("express");
const router = express.Router();
const uploadImage = require("../middleware/uploadImages");
const productController = require("../Controller/UsersProduct");

// POST: create product (with multiple images)
router.post("/create/add-product", uploadImage.array("images", 5), productController.addProduct);

// GET: all products
router.get("/read/userProducts", productController.getAllProducts);

// GET: products by user
router.get("/user/:userId", productController.getUserProducts);

// PUT: update product by id (with optional images)
router.put("/update/:id", uploadImage.array("images", 5), productController.updateProduct);

// DELETE: delete product by id
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
