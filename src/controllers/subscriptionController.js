const subscriptionModel = require("../models/subscriptionModel");
const { successResponse, errorResponse } = require("../utils/helpers");

exports.getSubscriptionPlans = (req, res) => {
  try {
    const plans = subscriptionModel.getPlans();
    successResponse(res, plans);
  } catch (err) {
    console.error("Get Subscription Plans Error:", err);
    errorResponse(res, 500, "Server error");
  }
};
