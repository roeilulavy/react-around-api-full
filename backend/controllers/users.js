const bcrypt = require('bcryptjs');
const { getToken } = require('../utils/jwt');
const User = require('../models/user');
const {
  BadRequestError, AuthorizationError, NotFoundError, ConflictError,
} = require('../utils/errorHandler');

const SALT_ROUNDS = 10;

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      next(new BadRequestError('Invalid info was provided'));
    }

    const user = await User.findUserByCredentials(email, password);

    if (user) {
      const token = await getToken(user._id);

      res.status(200).json(token);
    } else {
      next(new AuthorizationError('Invalid Email or Password'));
    }
  } catch (err) {
    next(new AuthorizationError('Invalid Email or Password'));
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;

    if (!email || !password) {
      next(new BadRequestError('Invalid info was provided'));
    }

    const user = await User.findOne({ email });

    if (user) {
      next(new ConflictError('User already exist'));
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    if (hashedPassword) {
      const newUser = await User.create({
        email, password: hashedPassword, name, about, avatar,
      });

      if (!newUser) {
        next(new BadRequestError('Invalid info was provided'));
      }

      res.status(200).send({
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
      });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Invalid info was provided'));
      return;
    }
    next(err);
  }
};

module.exports.getUserInfo = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findOne({ _id });

    if (user) {
      res.status(200).send(user);
    } else if (user === null) {
      next(new NotFoundError('User not found!'));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Invalid info was provided'));
      return;
    }
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    if (users) {
      res.status(200).send(users);
    } else {
      throw new Error();
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (user) {
      res.status(200).send(user);
    } else if (user === null) {
      next(new NotFoundError('User not found!'));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Bad request'));
      return;
    }
    next(err);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updateProfile = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );

    if (updateProfile) {
      res.status(200).send(updateProfile);
    } else if (updateProfile === null) {
      next(new NotFoundError('User not found!'));
    }
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Bad request'));
      return;
    }
    next(err);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updateAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );

    if (updateAvatar) {
      res.status(200).send(updateAvatar);
    } else {
      throw new Error();
    }
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Bad request'));
      return;
    }
    next(err);
  }
};
