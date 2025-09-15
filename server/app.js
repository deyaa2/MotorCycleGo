require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');
const driverRoutes = require('./routes/drivers');
const rideRequestRoutes = require('./routes/rideRequest');
const messagesRoutes = require('./routes/messages');
const homeRoutes = require('./routes/home');
const pageRoutes = require('./routes/pages');

const app = express();

// --------------------
// Session setup
// --------------------
try {
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2 // 2 hours
    }
  }));

  app.use((req, res, next) => {
    try {
      res.locals.user = req.session.user || null;
      next();
    } catch (err) {
      console.error("❌ Error in session middleware:", err);
      res.status(500).send("Server error in session handling");
    }
  });
} catch (err) {
  console.error("❌ Error setting up session middleware:", err);
}

// --------------------
// Connect to MongoDB
// --------------------
(async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop app if DB fails
  }
})();

// --------------------
// View engine setup
// --------------------
try {
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));
} catch (err) {
  console.error("❌ Error setting up view engine:", err);
}

// --------------------
// Middleware
// --------------------
try {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
  app.use(express.static(path.join(__dirname, '../public')));
} catch (err) {
  console.error("❌ Error setting up middleware:", err);
}

// --------------------
// Routes
// --------------------
try {
  app.use('/', homeRoutes);
  app.use('/', pageRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/customers', customerRoutes);
  app.use('/drivers', driverRoutes);
  app.use('/api/messages', messagesRoutes);
  app.use('/api/ride-request', rideRequestRoutes);
  app.get('/logout', (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) {
        console.error("❌ Error destroying session:", err);
        return res.status(500).send("Error logging out");
      }
      res.clearCookie('connect.sid'); // clear session cookie
      res.redirect('/'); // send user to home page
    });
  } catch (err) {
    console.error("🔥 Logout route error:", err);
    res.status(500).send("Server error during logout");
  }
});

} catch (err) {
  console.error("❌ Error mounting routes:", err);
}

// --------------------
// Start server
// --------------------
try {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
} catch (err) {
  console.error("❌ Error starting server:", err);
}
