const Job = require("../models/Job");

// Create Job (company)
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      company: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all jobs (students)
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company", "companyName");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};