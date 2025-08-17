import mongoose from "mongoose";
import config from "../config/index.js";

const { mongoURI, dbName } = config;

if(!mongoURI){
  throw new Error("MongoDB URI is not defined in the configuration");
}

async function connectDB() {
  try {
    await mongoose.connect(`${mongoURI}/${dbName}`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
}

export default connectDB;
