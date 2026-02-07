import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
      unique: true
    },
    onBoarding: {
      type: Boolean,
      required: true
    },
    phoneNumber: {
      type: String,
      unique: true
    },
    location: {
      type: String,
    },
    city:{
      type: String,
    },
    landArea: {
      type: Number,  // in acres
    },
    cropsToPlant: {
      type: [String],  // array of crop names
    },
    soilType: {
      type: String,
    }
  },
  { timestamps: true }
);

const UserAuth = mongoose.model("UserAuth", userAuthSchema, "userauth");

export default UserAuth;
