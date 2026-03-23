const User = require("../models/User");

// Get my profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, cgpa, branch, skills, companyName } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update common fields
    if (name) user.name = name;

    // Update student fields
    if (user.role === "student") {
      if (cgpa !== undefined) user.cgpa = parseFloat(cgpa);
      if (branch) user.branch = branch;
      if (skills) {
        user.skills = typeof skills === "string"
          ? skills.split(",").map((s) => s.trim()).filter(Boolean)
          : skills;
      }
    }

    // Update company fields
    if (user.role === "company") {
      if (companyName) user.companyName = companyName;
    }

    // Update profile image if uploaded
    if (req.file) {
      user.profileImage = `/uploads/profiles/${req.file.filename}`;
    }

    await user.save();

    const updated = await User.findById(req.user._id).select("-password");
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};