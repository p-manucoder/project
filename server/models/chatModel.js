const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userName1: {
    type: String,
    required: true,
    // default: "user1",
  },

  user2: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userName2: {
    type: String,
    required: true,
    // default: "user2",
  },
  // date: {
  //   type: Date,
  //   required: true,
  // },
  roomId: { type: String, required: true, default: null },
});
module.exports = mongoose.model("chat", chatSchema);
