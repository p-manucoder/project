const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  mobileNumber: {
    required: true,
    type: Number,
    unique: true,
    maxlength: 10,
    minlength: 10,
  },
  address: {
    required: true,
    type: String,
  },
  role: {
    required: true,
    type: String,
    default: "user",
  },
});
module.exports = mongoose.model("user", userSchema);
