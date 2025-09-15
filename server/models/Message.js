const mongoose = require('mongoose');

let Message;

try {
  const messageSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    pickup: { lat: Number, lng: Number },
    destination: { lat: Number, lng: Number },
    pickupDesc: { type: String },
    destinationDesc: { type: String },
    text: { type: String, required: true },
    sentAt: { type: Date, default: Date.now }
  });

  Message = mongoose.model('Message', messageSchema);
  console.log("✅ Message model loaded");
} catch (err) {
  console.error("❌ Error defining Message model:", err);
  Message = null; // fallback to avoid crashing
}

module.exports = Message;
