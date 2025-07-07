const jobModel = require("../models/jobModel");

// ✅ POST /api/employer/jobs
exports.postJob = async (req, res) => {
  try {
    if (req.user.userType !== "employer") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const employerId = req.user.userId;
    const job = req.body;

    const jobId = await jobModel.createJob(employerId, job);

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      jobId,
      token: req.token, // echo the original JWT if you want
    });
  } catch (err) {
    console.error("Post Job Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

// ✅ GET /api/employer/jobs
exports.getPostedJobs = async (req, res) => {
  try {
    if (req.user.userType !== "employer") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const employerId = req.user.userId;
    const jobs = await jobModel.getJobsByEmployer(employerId);

    res.json({ success: true, jobs });
  } catch (err) {
    console.error("Get Posted Jobs Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

// ✅ GET /api/employer/jobs/:jobId/applications
exports.getJobApplications = async (req, res) => {
  try {
    if (req.user.userType !== "employer") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const { jobId } = req.params;
    const applications = await jobModel.getApplicationsForJob(jobId);

    res.json({ success: true, applications });
  } catch (err) {
    console.error("Get Job Applications Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};
