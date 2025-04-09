const db = require('../db');

exports.getAllMovies = async (req, res) => {
  try {
    const [movies] = await db.query('SELECT * FROM movies');
    res.json({ movies });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies.', error: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  const movieId = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM movies WHERE id = ?', [movieId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Movie not found.' });
    }
    res.json({ movie: rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movie.', error: error.message });
  }
};

exports.addMovie = async (req, res) => {
  const { title, description, poster_url } = req.body;
  if (!title || !description || !poster_url) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    await db.query(
      'INSERT INTO movies (title, description, poster_url) VALUES (?, ?, ?)',
      [title, description, poster_url]
    );
    res.status(201).json({ message: 'Movie added successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add movie.', error: error.message });
  }
};
