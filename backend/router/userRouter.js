const express = require("express");
const router = express.Router();
const userControler=require("../Controller/userController")
// Routes
router.post("/register/user", userControler.registerUser);
router.post("/login/user", userControler.loginUser);

module.exports = router;
