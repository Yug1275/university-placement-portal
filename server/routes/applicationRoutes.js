const express = require("express");
const {
  applyJob,
  getMyApplications,
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, applyJob);
router.get("/my", protect, getMyApplications);

module.exports = router;