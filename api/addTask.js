import jwt from "jsonwebtoken";
import { connectDB } from "./_db";
import { Task } from "./_models";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await connectDB();

  const token = req.headers.authorization?.split(" ")[1];
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const task = await Task.create({ userId, text: req.body.text, done: false });
    res.json(task);
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
