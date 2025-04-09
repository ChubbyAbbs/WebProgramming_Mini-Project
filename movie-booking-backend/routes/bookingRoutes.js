// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Book tickets
router.post('/book', async (req, res) => {
  const { userId, movieId, seatNumbers, totalAmount } = req.body;

  if (!userId || !movieId || !seatNumbers || !Array.isArray(seatNumbers) || seatNumbers.length === 0 || !totalAmount) {
    return res.status(400).json({ message: 'All booking details are required.' });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [movieCheck] = await connection.query('SELECT id FROM movies WHERE id = ?', [movieId]);
    if (movieCheck.length === 0) {
      return res.status(404).json({ message: 'Movie not found.' });
    }

    const [bookingResult] = await connection.query(
      'INSERT INTO bookings (user_id, movie_id, seat_numbers, total_amount) VALUES (?, ?, ?, ?)',
      [userId, movieId, seatNumbers.join(','), totalAmount]
    );

    await connection.commit();
    res.status(201).json({ message: 'Booking successful!', bookingId: bookingResult.insertId });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ message: 'Booking failed.', error: error.message });
  } finally {
    connection.release();
  }
});

// Get bookings for a user
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const [bookings] = await db.query(
      'SELECT b.id, b.seat_numbers, b.total_amount, m.title FROM bookings b JOIN movies m ON b.movie_id = m.id WHERE b.user_id = ?',
      [userId]
    );
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve bookings.', error: error.message });
  }
});

module.exports = router;
