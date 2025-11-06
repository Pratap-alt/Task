import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const taskSchema = new mongoose.Schema({
  userId: String,
  text: String,
  done: Boolean,
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
