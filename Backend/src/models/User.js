import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import ExpertConnectModal from "../../../Frontend/src/components/modals/ExpertConnectModal";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["farmer", "admin", "expert"], default: "farmer" },
  },
  { timestamps: true }
);

// Password hashing before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password match method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Helper methods for role checks
userSchema.methods.isAdmin = function () {
  return this.role === "admin";
};

userSchema.methods.isExpert = function () {
  return this.role === "expert";
};

const User = mongoose.model("User", userSchema);
export default User;


