const express = require("express");
const {
  createJob,
  getJobs,
  getMyJobs,
  deleteJob,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getJobs);         // students see all jobs
router.post("/", protect, createJob);      // company posts job
router.get("/my", protect, getMyJobs);     // company sees their jobs
router.delete("/:id", protect, deleteJob); // company deletes job

module.exports = router;