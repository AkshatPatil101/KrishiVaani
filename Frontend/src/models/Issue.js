import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["active", "resolved"], default: "active" },
}, { timestamps: true });

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
