const messageModel = require("../models/messageModel");

exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, subject, message, jobId } = req.body;
    const senderId = req.user.userId;

    if (!recipientId || !message) {
      return res
        .status(400)
        .json({
          success: false,
          message: "recipientId and message are required",
        });
    }

    const messageId = await messageModel.sendMessage(
      senderId,
      recipientId,
      subject,
      message,
      jobId
    );

    res.status(201).json({
      success: true,
      message: "Message sent",
      messageId,
    });
  } catch (err) {
    console.error("Send Message Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const userId = req.user.userId;
    const messages = await messageModel.getMessagesForUser(userId);

    res.json({ success: true, messages });
  } catch (err) {
    console.error("Get Messages Error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};
