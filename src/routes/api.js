const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.get("/messages/:room", async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room }).sort(
      "createdAt"
    );
    res.json(messages);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
