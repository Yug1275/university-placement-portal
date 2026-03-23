const Job = require("../models/Job");

// Create Job — only company allowed
exports.createJob = async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ message: "Only companies can post jobs" });
    }

    const job = await Job.create({
      ...req.body,
      company: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all jobs (for students)
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company", "companyName name");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get jobs posted by logged-in company
exports.getMyJobs = async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ message: "Not authorized" });
    }
    const jobs = await Job.find({ company: req.user._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a job (company only)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.deleteOne();
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};