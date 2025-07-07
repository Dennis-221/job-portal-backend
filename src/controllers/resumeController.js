const resumeModel = require("../models/resumeModel");
const { successResponse, errorResponse } = require("../utils/helpers");

exports.uploadResume = async (req, res) => {
  try {
    if (req.user.userType !== "jobseeker") {
      return errorResponse(
        res,
        403,
        "Access denied: Only jobseekers can upload resumes"
      );
    }

    if (!req.file) {
      return errorResponse(res, 400, "No file uploaded");
    }

    const filePath = req.file.path;
    const jobSeekerId = req.user.userId;

    const resumeId = await resumeModel.saveResume(jobSeekerId, filePath);

    successResponse(
      res,
      { resumeId, filePath },
      "Resume uploaded successfully"
    );
  } catch (err) {
    console.error("Upload Resume Error:", err);
    errorResponse(res, 500, "Server error");
  }
};

exports.listResumes = async (req, res) => {
  try {
    if (req.user.userType !== "jobseeker") {
      return errorResponse(res, 403, "Access denied");
    }

    const jobSeekerId = req.user.userId;
    const resumes = await resumeModel.getResumesByJobSeeker(jobSeekerId);

    successResponse(res, { resumes });
  } catch (err) {
    console.error("List Resumes Error:", err);
    errorResponse(res, 500, "Server error");
  }
};
