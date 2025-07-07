const express = require("express");
const router = express.Router();
const employerController = require("../controllers/employerController");
const authenticateToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleCheck");

router.post(
  "/jobs",
  authenticateToken,
  authorizeRoles("employer"),
  employerController.postJob
);
router.get(
  "/jobs",
  authenticateToken,
  authorizeRoles("employer"),
  employerController.getPostedJobs
);
router.get(
  "/jobs/:jobId/applications",
  authenticateToken,
  authorizeRoles("employer"),
  employerController.getJobApplications
);

module.exports = router;
