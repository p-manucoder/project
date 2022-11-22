const { default: mongoose } = require("mongoose");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const getChatsOfUser = async (req, res) => {
  try {
    let chats =
      (await Chat.find({
        $or: [{ user1: req.userId }, { user2: req.userId }],
      })) || [];
    // console.log(chats);
    res.json({
      chats,
    });
  } catch (err) {
    if (err) console.log(err);
  }
};
const createChat = async (req, res) => {
  try {
    let user2 = req.query.user2;
    // console.log("user 2", user2);
    // console.log("chat");
    let chat1 = await Chat.findOne({
      user1: mongoose.Types.ObjectId(req.userId),
      user2: mongoose.Types.ObjectId(user2),
    });
    let chat2 = await Chat.findOne({
      user1: mongoose.Types.ObjectId(user2),
      user2: mongoose.Types.ObjectId(req.userId),
    });
    if (chat1)
      res.json({
        chat: chat1,
      });
    else if (chat2) {
      res.json({
        chat: chat2,
      });
    } else {
      let userName1 = await User.findById(req.userId);
      userName1 = userName1.name;
      let userName2 = await User.findById(user2);
      userName2 = userName2.name;

      let chat = await Chat({
        user1: req.userId,
        user2,
        roomId: req.userId + user2 + "",
        userName1,
        userName2,
      });
      await chat.save();
      res.json({
        chat: chat,
      });
    }
  } catch (err) {
    if (err) console.log(err);
  }
};
module.exports = { getChatsOfUser, createChat };
