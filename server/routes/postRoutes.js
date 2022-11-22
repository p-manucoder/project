const express = require("express");
const { verifyToken } = require("../auth/verifyToken");
const {
  createNewPost,
  getPosts,
  getPost,
  getPostsByQuery,
  updateViews,
} = require("./../controllers/postController");
const router = express.Router();
router.post("/create", verifyToken, createNewPost);
router.get("/get-posts", verifyToken, getPosts);
router.get("/get-post", verifyToken, getPostsByQuery);
router.get("/update-view/:postId", verifyToken, updateViews);

router.get("/:postId", verifyToken, getPost);
module.exports = router;
