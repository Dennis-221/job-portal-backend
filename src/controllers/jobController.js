const jobModel = require("../models/jobModel");

exports.searchJobs = async (req, res) => {
  try {
    const filters = {
      keywords: req.query.keywords,
      location: req.query.location,
      experienceMin: req.query.experienceMin,
      experienceMax: req.query.experienceMax,
    };

    const jobs = await jobModel.searchJobs(filters);
    res.json({ success: true, jobs });
  } catch (err) {
    console.error("Search Jobs Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

exports.getJobDetails = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await jobModel.getJobById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, job });
  } catch (err) {
    console.error("Get Job Details Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};
