-- Create the database
CREATE DATABASE IF NOT EXISTS movie_booking;
USE movie_booking;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Movies table
CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  poster VARCHAR(255)
);

-- Seats table
CREATE TABLE seats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT,
  seat_number VARCHAR(10),
  occupied BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Bookings table
CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  movie_id INT,
  total_price DECIMAL(10, 2),
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Booking_Seats table (many-to-many relation)
CREATE TABLE booking_seats (
  booking_id INT,
  seat_id INT,
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  FOREIGN KEY (seat_id) REFERENCES seats(id),
  PRIMARY KEY (booking_id, seat_id)
);
INSERT INTO movies (title, description, poster) VALUES
('Inception', 'A thief who steals corporate secrets through dream-sharing tech is given a final chance at redemption.', 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg'),
('Interstellar', 'A group of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'),
('The Dark Knight', 'Batman faces his nemesis, the Joker, in a battle for Gotham\'s soul.', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg');

