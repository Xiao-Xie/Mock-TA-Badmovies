-- SET UP SCHEMA HERE
-- CREATE TABLE MyMovies IF NOT EXISTS (
--   MovieID INT AUTO
-- )


CREATE TABLE genre(
   genre_id INT,
   genre_name VARCHAR(50),
   PRIMARY KEY(genre_id)
);

CREATE TABLE movies(
   movie_id INT,
   movie_name VARCHAR(50),
   PRIMARY KEY(movie_id)
);