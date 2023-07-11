const mongoose = require('mongoose');
const validator = require('validator');

const urlValidator = {
  validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], required_protocol: true }),
  message: ({ value }) => `${value} - некоректный адрес URL. Ожидается адрес в формате: http(s)://(www.)site.com`,
};

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
