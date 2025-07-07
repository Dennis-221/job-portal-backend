const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleCheck");
const upload = require("../middleware/upload");
const resumeController = require("../controllers/resumeController");

// ✅ Upload resume
router.post(
  "/upload",
  authenticateToken,
  authorizeRoles("jobseeker"),
  upload.single("resume"),
  resumeController.uploadResume
);

// ✅ List resumes
router.get(
  "/",
  authenticateToken,
  authorizeRoles("jobseeker"),
  resumeController.listResumes
);

module.exports = router;
