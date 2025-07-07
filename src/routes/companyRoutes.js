const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleCheck");
const reviewController = require("../controllers/reviewController");

// POST /api/companies/:companyId/reviews
router.post(
  "/:companyId/reviews",
  authenticateToken,
  authorizeRoles("jobseeker"),
  reviewController.createCompanyReview
);

module.exports = router;
