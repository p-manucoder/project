const { default: mongoose } = require("mongoose");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const createNewPost = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });

    const post = await Post({
      ...req.body,
      postedBy: req.userId,
      postedOn: Date.now(),
      lostOn: Date.now(),
      userName: user.name,
      userMobileNumber: user.mobileNumber,
      userLocation: user.address,
    });
    await post.save();
    if (post) {
      res.json({
        status: "success",
        message: "Post created successfully!",
      });
    } else {
      res.json({
        status: "fail",
        message: "Please Fill All the Fields Correctly!",
      });
    }
  } catch (err) {
    if (err)
      res.json({
        status: "fail",
        message: "Please Fill All the Fields Correctly!",
      });
  }
};
const getPosts = async (req, res) => {
  try {
    let posts = await Post.find({});
    posts.sort(function (a, b) {
      if (a.isPremium == true && b.isPremium == true) {
        if (a.views != b.views) return b.views - a.views;
      }
      if (a.isPremium) return -1;
      if (b.isPremium) return 1;
      if (a.isPremium != true && b.isPremium !== true)
        if (a.views != b.views) return b.views - a.views;
      return new Date(b.lostOn) - new Date(a.lostOn);
    });
    return res.json({
      status: "success",
      posts,
    });
  } catch (err) {
    if (err) console.log(err);
  }
};
const getPost = async (req, res) => {
  try {
    const data = await Post.findOne({ _id: req.params.postId });
    res.json({
      data,
    });
  } catch (err) {
    if (err) console.log(err);
  }
};
const getPostsByQuery = async (req, res) => {
  try {
    let query = req.query.query;
    let filteredData = [];
    const temp1 = await Post.find({
      name: { $regex: ".*" + `${query}` + ".*", $options: "i" },
    });
    const temp2 = await Post.find({ type: query });
    const temp3 = await Post.find({ city: query });
    const temp4 = await Post.find({ state: query });
    filteredData = [...temp1, ...temp2, ...temp3, ...temp4];
    filteredData.sort(function (a, b) {
      if (a.isPremium == true && b.isPremium == true) {
        if (a.views != b.views) return b.views - a.views;
      }
      if (a.isPremium) return -1;
      if (b.isPremium) return 1;
      if (a.views != b.views) return b.views - a.views;
      return new Date(b.lostOn) - new Date(a.lostOn);
    });
    res.json({ posts: filteredData });
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};
const updateViews = async (req, res) => {
  // console.log("here");
  try {
    // console.log(req.params.postId);
    let views = await Post.findById(req.params.postId);
    views = views.views;
    const data = await Post.findByIdAndUpdate(req.params.postId, {
      views: views + 1,
    });
    res.json({
      message: "success",
    });
  } catch (err) {
    if (err) console.log(err);
  }
};
module.exports = {
  createNewPost,
  getPosts,
  getPost,
  getPostsByQuery,
  updateViews,
};
