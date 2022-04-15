const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const jwtsecret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const getToken = (userId) => jwt.sign({ _id: userId }, jwtsecret, { expiresIn: '7d' });

const isAuthorized = (token) => {
  if (!token) {
    return Promise.resolve(false);
  }

  const { id } = jwt.verify(token, jwtsecret);

  return User.findOne({ email: id })
    .then((user) => !!user)
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      Promise.resolve(false);
    });
};

module.exports = { getToken, isAuthorized };
