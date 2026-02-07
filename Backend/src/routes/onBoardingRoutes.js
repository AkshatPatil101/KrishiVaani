import express from "express"
import UserAuth from "../models/UserAuth.js"
 
const router = express.Router();

//
router.get("/",async (req,res) => {
    try{
        // Get the email from a query parameter
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email query parameter is required." });
        }

        // Use findOne to get a single document that matches the email
        const userAuthentication = await UserAuth.findOne({ Email: email });

        // If the user document is not found, return an empty JSON object
        if (!userAuthentication) {
            return res.status(200).json({});
        }

        // If the user document is found, return the entire document
        res.status(200).json(userAuthentication);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"server error"});
    }
});



//
router.post("/", async (req, res) => {
    try {
        const { Email, onBoarding, phoneNumber, location, city, landArea, cropsToPlant, soilType } = req.body;

        const newUserAuthentication = new UserAuth({
            Email,
            onBoarding,
            phoneNumber,
            location,
            city,
            landArea,
            cropsToPlant,
            soilType
        });

        await newUserAuthentication.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/", async (req, res) => {
  try {
    const { Email, onBoarding, phoneNumber, location, city, landArea, cropsToPlant, soilType } = req.body;

    // Find user by Email and update their details
    const updatedUser = await UserAuth.findOneAndUpdate(
      { Email }, // filter
      {
        onBoarding,
        phoneNumber,
        location,
        city,
        landArea,
        cropsToPlant,
        soilType,
      },
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});






export default router;