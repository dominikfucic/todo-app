import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema<Todo>({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export const Todo = mongoose.model<Todo>("Todo", todoSchema);
