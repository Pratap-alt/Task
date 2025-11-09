import { connectDB } from "../_db.js";
import { Task } from "../_models.js";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end("Method Not Allowed");

  await connectDB();
  const { id } = req.query;

  try {
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}