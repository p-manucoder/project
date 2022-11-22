const { default: mongoose } = require("mongoose");
const Message = require("../models/messageModel");
const sendMessage = async (req, res) => {
  try {
    const senderId = req.body.sentBy;
    const receiverId = req.body.receivedBy;
    const date = req.body.date;
    const message = req.body.message;
    const text = req.body.text;
    const roomId = req.body.roomId;
    const msg = await Message({
      senderId,
      receiverId,
      date,
      message,
      roomId,
      text,
    });
    await msg.save();
    if (msg) {
      res.json({
        status: "success",
        message: "Message sent successfully!",
      });
    }
  } catch (err) {
    if (err) console.log(err);
  }
};
const getMessagesOfUser = async (req, res) => {
  try {
    let user2 = req.query.user2;
    let user1 = req.userId;
    let messages = [],
      tempMessages = [];
    if (user2) {
      messages = await Message.find({
        receiverId: mongoose.Types.ObjectId(user1),
        senderId: mongoose.Types.ObjectId(user2),
      });
      // console.log(messages);

      tempMessages = await Message.find({
        receiverId: mongoose.Types.ObjectId(user2),
        senderId: mongoose.Types.ObjectId(user1),
      });
      // console.log(req.userId);
      let tempArr = [...messages, ...tempMessages];
      tempArr.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date) - new Date(b.date);
      });

      res.json({
        messages: tempArr,
      });
    } else {
      res.json({
        error: "error",
      });
    }
  } catch (err) {
    if (err) console.log(err);
  }
};
module.exports = { sendMessage, getMessagesOfUser };
