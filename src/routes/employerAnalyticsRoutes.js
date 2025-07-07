const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleCheck");
const analyticsController = require("../controllers/analyticsController");

// 👉 Mount under /api/employer/analytics/job/:jobId
router.get(
  "/job/:jobId",
  authenticateToken,
  authorizeRoles("employer"),
  analyticsController.getJobAnalytics
);

module.exports = router;
