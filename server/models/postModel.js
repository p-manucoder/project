const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
  },

  description: {
    required: true,
    type: String,
    unique: true,
  },
  postedOn: {
    required: true,
    type: Date,
  },
  state: {
    required: true,
    type: String,
  },
  city: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: Object,
    default: {},
  },
  photos: {
    type: Array,
    default: [],
  },
  likes: {
    required: true,
    type: Number,
    default: 0,
  },
  dislikes: {
    required: true,
    type: Number,
    default: 0,
  },
  lostOn: {
    required: true,
    type: Date,
  },
  postedBy: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },

  isPremium: {
    type: Boolean,
    default: false,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
    required: true,
  },
  action: {
    type: String,
    default: "lost",
    required: "true",
  },
  userName: {
    required: true,
    type: String,
    default: "",
  },
  userMobileNumber: {
    // required: true,
    type: String,
    default: "",
  },
  userLocation: {
    // required: true,
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("post", postSchema);
