const User = require("../model/CreateUserModel");
const bcrypt = require("bcrypt");

// Register new user
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", userId: newUser.userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    res.json({
      message: "Login successful",
      userId: user.userId,
      name: user.name,
      phone: user.phone,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ all users
const readUser = async (req, res) => {
    const getData = await User.find();
    if (getData) {
        res.send(getData);
    }
};

module.exports = { registerUser, loginUser, readUser };
