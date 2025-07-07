const analyticsModel = require("../models/analyticsModel");
const { successResponse, errorResponse } = require("../utils/helpers");

exports.getJobSeekerAnalytics = async (req, res) => {
  try {
    if (req.user.userType !== "jobseeker") {
      return errorResponse(res, 403, "Access denied");
    }

    const jobSeekerId = req.user.userId;
    const analytics = await analyticsModel.getJobSeekerAnalytics(jobSeekerId);

    res.json({
      success: true,
      analytics,
    });
  } catch (err) {
    console.error("Get Analytics Error:", err);
    errorResponse(res, 500, "Server error");
  }
};

exports.getJobAnalytics = async (req, res) => {
  try {
    if (req.user.userType !== "employer") {
      return errorResponse(res, 403, "Access denied");
    }

    const jobId = parseInt(req.params.jobId, 10);
    if (isNaN(jobId)) {
      return errorResponse(res, 400, "Invalid jobId");
    }

    const analytics = await analyticsModel.getJobAnalytics(jobId);
    successResponse(res, { analytics });
  } catch (err) {
    console.error("Get Job Analytics Error:", err);
    errorResponse(res, 500, "Server error");
  }
};
