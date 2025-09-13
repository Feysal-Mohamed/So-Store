const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");

// User registration
router.post("/register/user", userController.registerUser);

// User login
router.post("/login/user", userController.loginUser);

// Read all users
router.get("read/users", userController.readUser);

module.exports = router;
