const express = require("express");
const {
  getAllUsers,
  deleteUser,
  updateCompanyStatus,
  getAllJobs,
  deleteJob,
  getStats,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", protect, getStats);
router.get("/users", protect, getAllUsers);
router.delete("/users/:id", protect, deleteUser);
router.put("/company/:id/approve", protect, updateCompanyStatus);
router.get("/jobs", protect, getAllJobs);
router.delete("/jobs/:id", protect, deleteJob);

module.exports = router;