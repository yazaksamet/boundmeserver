const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

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
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
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

userSchema.methods.generateToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      validUntil: new Date(new Date().setDate(new Date().getDate() + 1)),
      systemDate: new Date()
    },
    config.jwtToken
  );
};

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
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    confirmPassword: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
};

const user = mongoose.model("User", userSchema);

module.exports.User = user;
module.exports.validate = validate;
