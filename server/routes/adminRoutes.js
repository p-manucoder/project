const express = require("express");
const { verifyAdmin } = require("../auth/verifyAdmin");
const {
  adminLogin,
  usersData,
  postsData,
  chatsData,
  reportedPostsData,
  homepageData,
  deletePost,
} = require("../controllers/adminController");
const { db } = require("../models/userModel");
const router = express.Router();
router.post("/login", adminLogin);
router.get("/delete-post", deletePost);
router.post("/get-homepage-data", verifyAdmin, homepageData);
router.get("/users-data", verifyAdmin, usersData);
router.get("/posts-data", verifyAdmin, postsData);
router.get("/chats-data", verifyAdmin, chatsData);
router.get("/reported-posts-data", verifyAdmin, reportedPostsData);

module.exports = router;
