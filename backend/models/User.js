import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        clerkId:String,
        email:String,
        name:String,
    },
    {timestamps:true}
);

export default mongoose.model("User",userSchema)