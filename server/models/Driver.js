const mongoose = require('mongoose');

let Driver;

try {
  const driverSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    passwordHash: String,
    drivingLicenceImage: String,
    bikeImage: String,
    rating: { type: Number, default: 0 }
  }, { timestamps: true });

  Driver = mongoose.model('Driver', driverSchema);
  console.log("✅ Driver model loaded");
} catch (err) {
  console.error("❌ Error defining Driver model:", err);
  Driver = null; // fallback to avoid crashing
}

module.exports = Driver;
