const express = require("express");
const { verifyToken } = require("../auth/verifyToken");
const { getChatsOfUser, createChat } = require("../controllers/chatController");
const router = express.Router();
router.get("/get-chats-of-user", verifyToken, getChatsOfUser);
router.get("/create-chat", verifyToken, createChat);
module.exports = router;
