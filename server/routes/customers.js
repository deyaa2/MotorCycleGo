const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

// GET /customers/:id/profile
router.get('/:id/profile', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    res.render('customerProfile', { customer });
  } catch (err) {
    console.error("❌ Error loading customer profile:", err);
    res.status(500).send("Server error while loading profile");
  }
});

// GET /customers/:id/request-ride
router.get('/:id/request-ride', (req, res) => {
  try {
    const user = req.session.user;

    if (!user || user.type !== 'customer' || user.id !== req.params.id) {
      return res.status(403).send('Unauthorized');
    }

    res.render('customerRequestRide');
  } catch (err) {
    console.error("❌ Error loading ride request page:", err);
    res.status(500).send("Server error while loading ride request");
  }
});

module.exports = router;
