const Application = require("../models/Application");

// Student: Apply to a job
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

// Student: Get my applications
exports.getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ student: req.user._id })
      .populate("job");
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Company: Get all applicants for a specific job
exports.getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("student", "name email cgpa branch skills");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Company: Update application status (shortlist / reject / select)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.json({ message: "Status updated", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};