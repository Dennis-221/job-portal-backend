const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authenticateToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleCheck");

// All routes require auth and jobseeker role
router.get(
  "/",
  authenticateToken,
  authorizeRoles("jobseeker"),
  profileController.getProfile
);
router.put(
  "/",
  authenticateToken,
  authorizeRoles("jobseeker"),
  profileController.updateProfile
);

module.exports = router;
