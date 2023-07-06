import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/todo-app`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};