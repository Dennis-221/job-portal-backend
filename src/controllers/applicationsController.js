const applicationModel = require("../models/applicationModel");

exports.applyToJob = async (req, res) => {
  try {
    if (req.user.userType !== "jobseeker") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const jobSeekerId = req.user.userId;
    const { jobId, coverLetter, resumeId } = req.body;

    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: "jobId is required" });
    }

    const applicationId = await applicationModel.createApplication(
      jobId,
      jobSeekerId,
      resumeId,
      coverLetter
    );

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      applicationId,
    });
  } catch (err) {
    console.error("Apply to Job Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

exports.viewOwnApplications = async (req, res) => {
  try {
    if (req.user.userType !== "jobseeker") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const jobSeekerId = req.user.userId;
    const applications = await applicationModel.getApplicationsByJobSeeker(
      jobSeekerId
    );

    res.json({ success: true, applications });
  } catch (err) {
    console.error("View Applications Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    if (req.user.userType !== "employer") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const { applicationId } = req.params;
    const { status } = req.body;

    const changes = await applicationModel.updateApplicationStatus(
      applicationId,
      status
    );

    if (changes === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    res.json({
      success: true,
      message: "Application status updated",
    });
  } catch (err) {
    console.error("Update Application Status Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};
