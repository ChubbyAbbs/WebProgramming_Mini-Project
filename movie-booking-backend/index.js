// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

// Import route files
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('🎬 Movie Booking Backend is running!');
});

// Test DB connection on startup
db.query('SELECT 1')
  .then(() => {
    console.log('✅ Connected to MySQL database');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Error connecting to MySQL:', err.message);
  });
