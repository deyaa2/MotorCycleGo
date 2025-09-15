const express = require('express');
const router = express.Router();

// Render customer register page
router.get('/register-customer', (req, res) => {
  try {
    res.render('register-customer');
  } catch (err) {
    console.error("❌ Error rendering customer register page:", err);
    res.status(500).send("Server error");
  }
});

// Render customer login page
router.get('/login-customer', (req, res) => {
  try {
    res.render('login-customer');
  } catch (err) {
    console.error("❌ Error rendering customer login page:", err);
    res.status(500).send("Server error");
  }
});

// Render driver register page
router.get('/register-driver', (req, res) => {
  try {
    res.render('register-driver');
  } catch (err) {
    console.error("❌ Error rendering driver register page:", err);
    res.status(500).send("Server error");
  }
});

// Render driver login page
router.get('/login-driver', (req, res) => {
  try {
    res.render('login-driver');
  } catch (err) {
    console.error("❌ Error rendering driver login page:", err);
    res.status(500).send("Server error");
  }
});

// Help page
router.get('/help', (req, res) => {
  try {
    res.render('help');
  } catch (err) {
    console.error("❌ Error rendering help page:", err);
    res.status(500).send("Server error while loading help page");
  }
});

module.exports = router;
