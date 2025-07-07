const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");
const authenticateToken = require("../middleware/auth");

// Send a message (auth required)
router.post("/send", authenticateToken, messagesController.sendMessage);

// Get all messages for user (auth required)
router.get("/", authenticateToken, messagesController.getMessages);

module.exports = router;
