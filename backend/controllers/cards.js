const Card = require('../models/card');
const {
  BadRequestError, NotFoundError,
} = require('../utils/errorHandler');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    if (cards) {
      res.status(200).send(cards);
    } else {
      throw new Error();
    }
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    const newCard = await Card.create({ name, link, owner: req.user._id });

    if (newCard) {
      res.status(200).send(newCard);
    }
    next(new BadRequestError('Invalid info was provided'));
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Invalid info was provided'));
    } else {
      next(err);
    }
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const deleteCard = await Card.findByIdAndRemove(req.params.cardId);

    if (deleteCard) {
      res.status(200).send(deleteCard);
    }
    next(new NotFoundError('Card not found!'));
  } catch (err) {
    next(new BadRequestError('Invalid info was provided'));
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (like) {
      res.status(200).send(like);
    }
    next(new NotFoundError('Card not found!'));
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Invalid info was provided'));
      return;
    }
    next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const dislike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (dislike) {
      res.status(200).send(dislike);
    }
    next(new NotFoundError('Card not found!'));
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Invalid info was provided'));
      return;
    }
    next(err);
  }
};
