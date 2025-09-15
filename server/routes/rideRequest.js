const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Driver = require('../models/Driver');

router.post('/', async (req, res) => {
  try {
    console.log("📥 Incoming ride request:", req.body);

    const { pickup, destination, pickupDesc, destinationDesc } = req.body;
    const customer = req.session.user;

    // Validate session
    if (!customer || customer.type !== 'customer') {
      console.warn("❌ Unauthorized ride request attempt");
      return res.status(403).send("Unauthorized");
    }

    // Validate required fields
    if (!pickup || !destination || !pickupDesc || !destinationDesc) {
      console.warn("⚠️ Missing required ride request fields");
      return res.status(400).send("Missing required fields");
    }

    // Find an available driver
    const driver = await Driver.findOne();
    if (!driver) {
      console.warn("⚠️ No driver available for request");
      return res.status(404).send("No driver available");
    }

    // Prepare message text
    const text = `${customer.name} wants to get a ride with you.
Pickup: ${pickupDesc}
Destination: ${destinationDesc}`;

    // Create and save message
    const message = new Message({
      customer: customer.id,
      driver: driver._id,
      pickup,
      destination,
      pickupDesc,
      destinationDesc,
      text
    });

    await message.save();
    console.log("✅ Message saved to DB:", message);

    res.sendStatus(200);
  } catch (err) {
    console.error("🔥 Error processing ride request:", err);
    res.status(500).send("Server error while processing ride request");
  }
});

module.exports = router;
