import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { addUser } from "../models/user.model.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET;

// Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const response = await addUser(name, email, hashedPassword);
    res.status(201).json({ success: true, data: response });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ Email: email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.Password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
};
