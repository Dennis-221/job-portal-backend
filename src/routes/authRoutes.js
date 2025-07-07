const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/jobseeker/register", authController.registerJobSeeker);
router.post("/employer/register", authController.registerEmployer);
router.post("/login", authController.login);

module.exports = router;
