import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "./_db";
import { User } from "./_models";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await connectDB();

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
  res.json({ token, name: user.name });
}
