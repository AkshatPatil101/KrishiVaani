import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// Send a message
router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: "Message sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to send message." });
  }
});

// Get all messages for an expert
router.get("/:expertId", async (req, res) => {
  try {
    const expertId = req.params.expertId; // usually expert email
    const messages = await Message.find({ receiverId: expertId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch messages." });
  }
});

export default router;
