import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import jwt from "jsonwebtoken";
import { User } from "../model/SignupModel.js";

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ status: true, message: "user already existed" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  await newUser.save();
  return res.json({ status: true, message: "record registed" });
});

// Login Router

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  console.log(user);

  if (!user) {
    return res.json({ message: "User doesn't exist" });
  }

  let validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "wrong password" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "login successfully" });
});

export { router as userRoutes };
