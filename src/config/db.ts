import mongoose from "mongoose";
import { env } from "./env";

let isConnecting = false;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  if (isConnecting) {
    return;
  }

  if (!env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  isConnecting = true;
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  } finally {
    isConnecting = false;
  }
}