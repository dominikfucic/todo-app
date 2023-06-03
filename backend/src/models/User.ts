import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema<User>({
  email: String,
  password: Buffer,
  salt: Buffer,
});

export const User = mongoose.model<User>("User", todoSchema);
