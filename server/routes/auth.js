const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const Driver = require('../models/Driver');
const upload = require('../middleware/upload');

const router = express.Router();

// Customer register
router.post('/register/customer', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    await Customer.create({ firstName, lastName, email, passwordHash });
    console.log("✅ Customer registered:", email);
    res.redirect('/login-customer');
  } catch (err) {
    console.error("❌ Error registering customer:", err);
    res.status(500).send("Server error during customer registration");
  }
});

// Driver register
router.post('/register/driver', upload.fields([
  { name: 'drivingLicenceImage', maxCount: 1 },
  { name: 'bikeImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const drivingLicenceImage = req.files['drivingLicenceImage']?.[0]?.filename;
    const bikeImage = req.files['bikeImage']?.[0]?.filename;

    if (!drivingLicenceImage || !bikeImage) {
      return res.status(400).send("Missing required images");
    }

    await Driver.create({
      firstName,
      lastName,
      email,
      passwordHash,
      drivingLicenceImage,
      bikeImage
    });

    console.log("✅ Driver registered:", email);
    res.redirect('/login-driver');
  } catch (err) {
    console.error("❌ Error registering driver:", err);
    res.status(500).send("Server error during driver registration");
  }
});

// Customer login
router.post('/login/customer', async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(401).send('Invalid email');

    const match = await bcrypt.compare(password, customer.passwordHash);
    if (!match) return res.status(401).send('Invalid password');

    req.session.user = {
      type: 'customer',
      name: customer.firstName,
      id: customer._id
    };

    console.log("✅ Customer logged in:", email);
    res.redirect(`/customers/${customer._id}/profile`);
  } catch (err) {
    console.error("❌ Error during customer login:", err);
    res.status(500).send("Server error during customer login");
  }
});

// Driver login
router.post('/login/driver', async (req, res) => {
  try {
    const { email, password, driverId } = req.body;
    const driver = await Driver.findOne({ email });
    if (!driver || driver._id.toString() !== driverId) {
      return res.status(401).send('Invalid credentials');
    }

    const match = await bcrypt.compare(password, driver.passwordHash);
    if (!match) return res.status(401).send('Invalid password');

    req.session.user = {
      type: 'driver',
      name: driver.firstName,
      id: driver._id
    };

    console.log("✅ Driver logged in:", email);
    res.redirect(`/drivers/${driver._id}/profile`);
  } catch (err) {
    console.error("❌ Error during driver login:", err);
    res.status(500).send("Server error during driver login");
  }
});

// // Logout route
// router.get('/logout', (req, res) => {
//   try {
//     req.session.destroy(err => {
//       if (err) {
//         console.error("❌ Error destroying session:", err);
//         return res.status(500).send("Error logging out");
//       }
//       res.redirect('/'); // Go back to home page
//     });
//   } catch (err) {
//     console.error("❌ Logout error:", err);
//     res.status(500).send("Server error during logout");
//   }
// });

module.exports = router;
