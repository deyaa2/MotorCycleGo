const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    res.render('home', { title: 'Welcome to MotorCycleGo' });
  } catch (err) {
    console.error("❌ Error rendering home page:", err);
    res.status(500).send("Server error loading home page");
  }
});

module.exports = router;
