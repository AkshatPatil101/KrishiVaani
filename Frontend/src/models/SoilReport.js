import mongoose from "mongoose";

const soilReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  result: { type: String, required: true },
}, { timestamps: true });

const SoilReport = mongoose.model("SoilReport", soilReportSchema);
export default SoilReport;
