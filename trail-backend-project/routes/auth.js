const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const userExist = await User.findOne({ username });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  console.log(process.env.JWT_SECRET);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

router.get("/profile", authMiddleware, async (req, res) => {
  res.json(req.user.id);
});

router.get("/test/:username", authMiddleware, async (req, res) => {
  console.log("Inside test route");
  res.json({ message: "Test route accessed" });
  console.log(req.params.username);
});

router.get("/test", authMiddleware, async (req, res) => {
  console.log("Inside test route");
  res.json({ message: "Test route accessed" });
  console.log(req.query);
  console.log(req.query.search);
  console.log(req.query.username);
});

router.get("/trail/:blogId", authMiddleware, async (req, res) => {
  console.log("blogId: ", req.params.blogId);
  res.json({ message: "Trail route accessed" });
});

module.exports = router;

router.get("/trail", authMiddleware, async (req, res) => {
  console.log("Query test chesthunnam");
  console.log(req.query);
  res.json({ message: "Query testing" });
});
