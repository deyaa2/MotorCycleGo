const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET all messages for the logged-in driver
router.get('/', async (req, res) => {
  try {
    const user = req.session.user;

    if (!user || user.type !== 'driver') {
      return res.status(403).send("Unauthorized");
    }

    const messages = await Message.find({ driver: user.id })
      .sort({ sentAt: -1 })
      .lean();

    res.json(messages);
  } catch (err) {
    console.error("❌ Error loading driver messages:", err);
    res.status(500).send("Server error while loading messages");
  }
});

module.exports = router;
