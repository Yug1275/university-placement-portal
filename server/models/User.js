const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["student", "company", "admin"],
      default: "student",
    },

    // Student fields
    cgpa: Number,
    branch: String,
    skills: { type: [String], default: [] },
    resume: String,

    // Company fields
    companyName: String,
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);