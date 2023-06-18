import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema<User>({
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: Buffer,
    required: true,
  },
  salt: { type: Buffer, required: true },
});

export const User = mongoose.model<User>("User", todoSchema);
