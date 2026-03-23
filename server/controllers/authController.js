const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, cgpa, skills, companyName } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Build user object based on role
    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    // ✅ Add student fields if role is student
    if (role === "student") {
      userData.cgpa = cgpa || 0;
      userData.skills = skills || [];
    }

    // ✅ Add company fields if role is company
    if (role === "company") {
      userData.companyName = companyName || name;
    }

    const user = await User.create(userData);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      cgpa: user.cgpa,
      skills: user.skills,
      companyName: user.companyName,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};