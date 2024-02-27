import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB is connected");
    }catch(err){
        throw new Error("something went Wrong!")
    }
}

export default connectDB;