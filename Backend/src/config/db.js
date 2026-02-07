import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://subProd:subProd@cluster0.m0ogwpt.mongodb.net/?appName=Cluster0")
        console.log("MONGO DB Connected successfully");
    }catch(error){
        console.error(error);
    }
}
