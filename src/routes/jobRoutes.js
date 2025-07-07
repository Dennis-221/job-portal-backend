const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

router.get("/search", jobController.searchJobs);
router.get("/:jobId", jobController.getJobDetails);

module.exports = router;
