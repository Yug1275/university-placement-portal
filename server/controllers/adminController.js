const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve or reject company
exports.updateCompanyStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { approved } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Company not found" });

    if (user.role !== "company") {
      return res.status(400).json({ message: "User is not a company" });
    }

    user.approved = approved;
    await user.save();

    res.json({ message: `Company ${approved ? "approved" : "rejected"}`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const jobs = await Job.find().populate("company", "name companyName email");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    await job.deleteOne();
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get dashboard stats
exports.getStats = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const totalStudents = await User.countDocuments({ role: "student" });
    const totalCompanies = await User.countDocuments({ role: "company" });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    res.json({ totalStudents, totalCompanies, totalJobs, totalApplications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};