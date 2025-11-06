import { connectDB } from "../_db.js";
import { Task } from "../_models.js";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end("Method Not Allowed");

  await connectDB();
  const { id } = req.query;

  try {
    const { done, text } = req.body || {};
    const updated = await Task.findByIdAndUpdate(
      id,
      { ...(done !== undefined && { done }), ...(text && { text }) },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
