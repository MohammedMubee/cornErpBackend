import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB() {
  console.log("MONGO_URI starts with:", env.MONGO_URI);
     
  await mongoose.connect(env.MONGO_URI);

  console.log("MongoDB connected");
}