const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimiter = require('express-rate-limit');
const { celebrate, Joi, errors } = require('celebrate');
const { handleErrors } = require('./middleware/handleErrors');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { login, createUser } = require('./controllers/users');
const { NotFoundError } = require('./utils/errorHandler');
const { auth } = require('./middleware/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const PORT = process.env.PORT || 3000;
const app = express();

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.disable('x-powered-by');

app.use(cors());
app.options('*', cors());

app.use(requestLogger);

// routes
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.get('/*', (req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

app.use(errorLogger);

app.use(handleErrors);

app.use(errors());

mongoose.connection.once('error', () => {
  console.error.bind(console, 'MongoDB Connection Error: ');// eslint-disable-line no-console
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');// eslint-disable-line no-console
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));// eslint-disable-line no-console
});
