const reviewModel = require("../models/reviewModel");
const { successResponse, errorResponse } = require("../utils/helpers");

exports.createCompanyReview = async (req, res) => {
  try {
    if (req.user.userType !== "jobseeker") {
      return errorResponse(res, 403, "Only jobseekers can post reviews");
    }

    const companyId = parseInt(req.params.companyId, 10);
    if (isNaN(companyId)) {
      return errorResponse(res, 400, "Invalid companyId");
    }

    const jobSeekerId = req.user.userId;
    const reviewData = req.body;

    // Validate required fields
    if (!reviewData.overallRating || !reviewData.ratings || !reviewData.title) {
      return errorResponse(res, 400, "Missing required fields");
    }

    const reviewId = await reviewModel.createReview(
      companyId,
      jobSeekerId,
      reviewData
    );

    successResponse(res, { reviewId }, "Review submitted successfully");
  } catch (err) {
    console.error("Create Review Error:", err);
    errorResponse(res, 500, "Server error");
  }
};
