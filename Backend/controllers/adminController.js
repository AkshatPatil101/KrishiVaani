    import User from "../models/User.js";
import Issue from "../models/Issue.js";
import SoilReport from "../models/SoilReport.js";

// Get total number of users
export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get total number of active issues
export const getIssuesCount = async (req, res) => {
  try {
    const count = await Issue.countDocuments({ status: "active" });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get total number of soil reports
export const getSoilReportsCount = async (req, res) => {
  try {
    const count = await SoilReport.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
