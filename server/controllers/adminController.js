const User = require("../models/userModel");
const Post = require("../models/postModel");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "jwt-secret-key";

const adminLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (user) {
      const isPasswordCorrect = password == "admin123";
      if (!isPasswordCorrect) {
        res.json({
          message: "Login Credentials Incorrect!",
          status: "fail",
        });
      } else {
        const token = jwt.sign({ id: user._id, role: "admin" }, JWT_SECRET_KEY);
        let homepageData = {
          posts: (await Post.find({})).length,
          users: (await User.find({})).length,
          chats: (await Chat.find({})).length,
          reportedPosts: (await Post.find({ status: "reported" })).length,
        };
        res.json({
          message: "Login Successful!",
          status: "success",
          token,
          homepageData,
        });
      }
    } else {
      res.json({
        message: "User Details Incorrect!",
        status: "fail",
      });
    }
  } catch (err) {
    if (err) console.log(err);
    // res.json({
    //   message: "User Details Incorrect!",
    //   status: "fail",
    // });
  }
};
const deletePost = async (req, res) => {
  try {
    const postId = req.query.postId;
    const post = await Post.findByIdAndDelete(postId);
    res.json({
      status: "success",
      message: "Post Deleted Successfully!",
    });
  } catch (e) {
    if (e) res.json({ status: "fail", message: "Some Error Occured!" });
  }
};
const usersData = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      users,
    });
  } catch (e) {
    if (e) console.log(e);
  }
};
const postsData = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json({
      posts,
    });
  } catch (e) {
    if (e) console.log(e);
  }
};
const chatsData = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json({
      chats,
    });
  } catch (e) {
    if (e) console.log(e);
  }
};
const reportedPostsData = async (req, res) => {
  try {
    const reportedPosts = await Post.find({ status: "reported" });
    res.json({
      reportedPosts,
    });
  } catch (e) {
    if (e) console.log(e);
  }
};
const homepageData = async (req, res) => {
  try {
    const token = req.body.token;
    let ans = jwt.verify(token, JWT_SECRET_KEY);
    let homepageData = {
      posts: (await Post.find({})).length,
      users: (await User.find({})).length,
      chats: (await Chat.find({})).length,
      reportedPosts: (await Post.find({ status: "reported" })).length,
    };
    res.json({
      msg: "Login Successful!",
      status: "success",
      homepageData,
    });
  } catch (e) {
    if (e) console.log(e);
  }
};
module.exports = {
  adminLogin,
  postsData,
  chatsData,
  usersData,
  reportedPostsData,
  homepageData,
  deletePost,
};
