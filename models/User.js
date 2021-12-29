const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  password: {
    type: String,
    required: [true, "password is required."],
  },
  isAdmin: {
    type: Boolean,
    required: [true, "is admin is required."],
    default: false,
  },
});

module.exports = new mongoose.model("User", UserSchema);
