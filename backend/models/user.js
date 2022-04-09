const mongoose = require('mongoose');
const emailValidator = require('validator');
const bcrypt = require('bcryptjs');
const { Unauthorized } = require('../utils/errorHandler');

const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'*+,;=.]+$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator(v) {
        return v.match(regex);
      },
      message: 'The link must be valid',
    },
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return emailValidator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  try {
    const user = await this.findOne({ email }).select('+password');

    if (!user) {
      return Promise.reject(new Unauthorized('Incorrect email or password'));
    }

    const pasVerification = await bcrypt.compare(password, user.password);

    if (!pasVerification) {
      return Promise.reject(new Unauthorized('Incorrect email or password'));
    }

    return user;
  } catch (e) {
    return Promise.reject(new Unauthorized('Incorrect email or password'));
  }
};

module.exports = mongoose.model('user', userSchema);
