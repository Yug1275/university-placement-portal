const Application = require("../models/Application");

// Apply to job
exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const existing = await Application.findOne({
      student: req.user._id,
      job: jobId,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      student: req.user._id,
      job: jobId,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get student's applications
exports.getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ student: req.user._id })
      .populate("job");

    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};