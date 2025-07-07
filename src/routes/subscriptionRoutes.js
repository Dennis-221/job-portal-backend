const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

// GET /api/subscriptions/plans
router.get("/plans", subscriptionController.getSubscriptionPlans);

module.exports = router;
