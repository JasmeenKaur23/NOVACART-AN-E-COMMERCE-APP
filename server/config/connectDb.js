import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("Please provide mongodb in .env file");
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connect Db");
  } catch (error) {
    console.log("Connection error (MongoDb)", error);
    process.exit(1);
  }
}

export default connectDB;
