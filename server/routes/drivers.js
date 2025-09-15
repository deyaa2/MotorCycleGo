const express = require('express');
const Driver = require('../models/Driver');
const router = express.Router();

// GET all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.render('ourDrivers', { drivers });
  } catch (err) {
    console.error("❌ Error loading drivers list:", err);
    res.status(500).send("Server error while loading drivers");
  }
});

// GET driver details
router.get('/:id/details', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).send("Driver not found");
    }
    res.render('driverDetails', { driver });
  } catch (err) {
    console.error("❌ Error loading driver details:", err);
    res.status(500).send("Server error while loading driver details");
  }
});

// GET driver profile
router.get('/:id/profile', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).send("Driver not found");
    }
    res.render('driverProfile', { driver });
  } catch (err) {
    console.error("❌ Error loading driver profile:", err);
    res.status(500).send("Server error while loading driver profile");
  }
});

// GET driver dashboard
router.get('/:id/dashboard', (req, res) => {
  try {
    const user = req.session.user;

    if (!user || user.type !== 'driver' || user.id !== req.params.id) {
      return res.status(403).send('Unauthorized');
    }

    res.render('driverDashboard');
  } catch (err) {
    console.error("❌ Error loading driver dashboard:", err);
    res.status(500).send("Server error while loading dashboard");
  }
});

module.exports = router;
