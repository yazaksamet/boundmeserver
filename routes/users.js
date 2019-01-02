const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  const users = await User.find({}).select(
    "_id firstName lastName email displayName"
  );
  res.send(users);
});

router.get("/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).send("User not found.");

  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    displayName: req.body.displayName,
    dateJoined: new Date(),
    password: hashedPassword
  });

  await user.save();

  res.send(user._id);
});

module.exports = router;
