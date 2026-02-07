import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://akshatsandeeppatil_db_user:i7Z3BteCd8K1TAzc@cluster0.yca45gq.mongodb.net/User?retryWrites=true&w=majority&appName=Cluster0")
        console.log("MONGO DB Connected successfully");
    }catch(error){
        console.error(error);
    }
}
