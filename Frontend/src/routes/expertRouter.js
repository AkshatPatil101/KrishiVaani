import express from "express";
import { sendEmail } from "../utilis/email.js";

const router = express.Router();

// POST /api/email
router.post("/", async (req, res) => {
  console.log("📩 Body received:", req.body);

  const { expertEmail, userName, userEmail, userIssue } = req.body;

  if (!expertEmail || !userName || !userEmail || !userIssue) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  const message = `
Hello,

A new issue has been reported that AI couldn't resolve.

User: ${userName} (${userEmail})
Issue: ${userIssue}

Please reach out to the user.

Regards,
KrishiVaani
`;

  try {
    await sendEmail({
      to: expertEmail,
      subject: "New User Issue",
      text: message,
    });
    res.json({ message: "✅ Email sent successfully" });
  } catch (err) {
    console.error("❌ Failed to send email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;