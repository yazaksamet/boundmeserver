const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const mobileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  batteryPercentage: {
    type: Number
  },
  dateRecorded: {
    type: Date,
    required: true
  }
});

validate = function(mobile) {
  if (!mobile) throw new Error("Invalid mobile object");

  const schema = {
    userId: Joi.objectId().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    batteryPercentage: Joi.number()
  };

  return Joi.validate(mobile, schema);
};

const mobile = mongoose.model("Mobile", mobileSchema);

module.exports.Mobile = mobile;
module.exports.validate = validate;
