const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv

router.post("/createConversation", async (req, res) => {
  try {
    const check = await Conversation.findOne({
      members: [req.body.senderId, req.body.receiverId],
    });
    if (check) {
      res.status(201).json({
        message: "this conversation already exist",
        check,
      });
    } else {
      const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
      });
      try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
      } catch (err) {
        res.status(500).json(err);
      }
      res.status(200).json({
        check,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401);
  }
});

router.get("/getConversation/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
