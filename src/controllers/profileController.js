const userModel = require("../models/userModel");

exports.getProfile = async (req, res) => {
  try {
    if (req.user.userType !== "jobseeker") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const jobSeekerId = req.user.userId;
    const row = await userModel.getJobSeekerProfile(jobSeekerId);

    if (!row) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res.json({
      success: true,
      profile: {
        id: row.id,
        email: row.email,
        name: row.name,
        mobile: row.mobile,
        workStatus: row.workStatus,
        experience: {
          years: row.experienceYears,
          months: row.experienceMonths,
        },
      },
    });
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (req.user.userType !== "jobseeker") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const jobSeekerId = req.user.userId;
    const changes = await userModel.updateJobSeekerProfile(
      jobSeekerId,
      req.body
    );

    if (changes === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Profile not found or no changes made",
        });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};
