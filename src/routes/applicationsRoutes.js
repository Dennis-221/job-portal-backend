const express = require("express");
const router = express.Router();
const applicationsController = require("../controllers/applicationsController");
const authenticateToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleCheck");

// Jobseeker applies to a job
router.post(
  "/apply",
  authenticateToken,
  authorizeRoles("jobseeker"),
  applicationsController.applyToJob
);

// Jobseeker views own applications
router.get(
  "/",
  authenticateToken,
  authorizeRoles("jobseeker"),
  applicationsController.viewOwnApplications
);

// Employer updates application status
router.put(
  "/:applicationId",
  authenticateToken,
  authorizeRoles("employer"),
  applicationsController.updateApplicationStatus
);

module.exports = router;
