const express = require("express");
const { User } = require("../models/user");
const { Mobile, validate } = require("../models/mobile");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:userId", auth, async (req, res) => {
  const userMobileInfo = await Mobile.find({
    userId: req.params.userId,
    dateRecorded: {
      $gt: new Date(new Date().setDate(new Date().getDate() - 1))
    }
  });
  res.send(userMobileInfo);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(404).send("User not found.");

  let mobileInfo = new Mobile({
    userId: req.body.userId,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    batteryPercentage: req.body.batteryPercentage,
    dateRecorded: new Date()
  });

  await mobileInfo.save();
  res.send("OK");
});

module.exports = router;
