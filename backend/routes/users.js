const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateUrl } = require('../helpers/validator');

const {
  getUserInfo,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/me', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  }),
}), getUserInfo);

usersRouter.get('/:user_id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  }),
}), getUserById);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(15),
    about: Joi.string().required().min(2).max(15),
  }),
}), updateProfile);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
}), updateAvatar);

module.exports = usersRouter;
