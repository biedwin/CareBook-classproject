import mongoose from "mongoose"

export async function connectDB(uri) {
    if(!uri) throw new Error("MONGODB_URL is missing. check your .env file");
    await mongoose.connect(uri);
    console.log("MONGODB is connected!")
}