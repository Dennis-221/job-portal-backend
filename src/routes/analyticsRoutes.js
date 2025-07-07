const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const authenticateToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleCheck");

// Jobseeker profile views
router.get(
  "/profile-views",
  authenticateToken,
  analyticsController.getJobSeekerAnalytics
);

router.get(
  "/job/:jobId",
  authenticateToken,
  authorizeRoles("employer"),
  analyticsController.getJobAnalytics
);
module.exports = router;
