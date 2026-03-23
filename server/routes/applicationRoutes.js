const express = require("express");
const {
  applyJob,
  getMyApplications,
  getApplicants,
  updateStatus,
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, applyJob);                     // student applies
router.get("/my", protect, getMyApplications);           // student sees their apps
router.get("/job/:jobId", protect, getApplicants);       // company sees applicants
router.put("/:id/status", protect, updateStatus);        // company updates status

module.exports = router;