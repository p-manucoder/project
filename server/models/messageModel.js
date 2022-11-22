const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  senderName: {
    type: String,
    // required: true,
    default: "sender",
  },

  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  receiverName: {
    type: String,
    // required: true,
    default: "receiver",
  },
  date: {
    type: Date,
    required: true,
  },
  message: { type: String, required: true },
  roomId: { type: String, required: true },
  text: {
    type: String,
  },
});
module.exports = mongoose.model("message", messageSchema);
