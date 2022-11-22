const express = require("express");
const { verifyToken } = require("../auth/verifyToken");
const {
  getMessagesOfUser,
  sendMessage,
} = require("../controllers/messageController");
const router = express.Router();
router.get("/get-of-current-user", verifyToken, getMessagesOfUser);
router.post("/send-message", verifyToken, sendMessage);

module.exports = router;
