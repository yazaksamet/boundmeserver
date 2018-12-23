const mongoose = require("mongoose");
const Joi = require("joi");

const config = require("../config/config");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  displayName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  dateJoined: {
    type: Date,
    required: true
  }
});

validate = function(user) {
  if (!user) throw new Error("Invalid user object");

  const schema = {
    firstName: Joi.string()
      .min(2)
      .max(50)
      .required(),
    lastName: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    displayName: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
};

const user = mongoose.model("User", userSchema);

module.exports.User = user;
module.exports.validate = validate;
