const movies = require('express').Router();

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');
const { validateMovieData, validateMovieId } = require('../utils/validators/movieValidators');

movies.post('/', validateMovieData, createMovie);
movies.get('/', getMovies);
movies.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = movies;
