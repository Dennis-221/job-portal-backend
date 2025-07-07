const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");
const authenticateToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleCheck");

// Employer searches candidates
router.get(
  "/candidates",
  authenticateToken,
  authorizeRoles("employer"),
  searchController.searchCandidates
);

// Jobseeker advanced job search
router.get("/jobs", searchController.advancedJobSearch);

module.exports = router;
