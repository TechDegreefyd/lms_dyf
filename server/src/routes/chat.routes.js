const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/conversations", chatController.getConversations);
router.get("/messages/:contactId", chatController.getMessages);
router.post("/send", chatController.sendMessage);

module.exports = router;
