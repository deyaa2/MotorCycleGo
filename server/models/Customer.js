const mongoose = require('mongoose');

let Customer;

try {
  const customerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    passwordHash: String
  }, { timestamps: true });

  Customer = mongoose.model('Customer', customerSchema);
  console.log("✅ Customer model loaded");
} catch (err) {
  console.error("❌ Error defining Customer model:", err);
  Customer = null; // fallback to avoid crashing
}

module.exports = Customer;
