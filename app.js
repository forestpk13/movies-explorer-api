// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('express-rate-limit');

const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const { login, createUser, logout } = require('./controllers/users');
const NotFoundError = require('./errors/notFounderror');
const auth = require('./middlewares/auth');
const { validateLoginData, validateRegisterData } = require('./utils/validators/userValidators');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/moviesdb', NODE_ENV } = process.env;
const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(limiter({
  windowMs: 10 * 60 * 1000,
  max: 100,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL);
app.use(requestLogger); // Логгер запросов
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLoginData, login);
app.post('/signup', validateRegisterData, createUser);

app.use(auth);// ниже защищенные роуты

app.use('/movies', moviesRouter);
app.use('/users', usersRouter);
app.get('/signout', logout);

app.use('*', () => {
  throw new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса');
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening in ${NODE_ENV || 'develop'} mode at port ${PORT}`);
});
