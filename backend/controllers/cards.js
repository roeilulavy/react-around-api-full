const Card = require('../models/card');
const User = require('../models/user');
const {
  BadRequestError, NotFoundError, ForbiddentError,
} = require('../utils/errorHandler');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);

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
  const { _id } = req.user;
  const { name, link } = req.body;

  try {
    const user = await User.findById({ _id });
    const newCard = await Card.create({ name, link, owner: user });
    if (newCard) {
      res.status(200).send(newCard);
    } else {
      throw new Error();
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Invalid info was provided'));
      return;
    }
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  try {
    const card = await Card.findById(cardId);
    const cardOwner = card.owner.toHexString();
    if (_id === cardOwner) {
      const deleteCard = await Card.findByIdAndRemove(cardId);
      if (deleteCard) {
        res.status(200).json(deleteCard);
      } else {
        throw new Error();
      }
    } else if (card === null) {
      next(new NotFoundError('Card not found!'));
    } else {
      next(new ForbiddentError('This card is not yours'));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Invalid info was provided'));
      return;
    }
    next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: _id } },
      { new: true },
    ).populate(['likes', 'owner']);

    if (like) {
      res.status(200).send(like);
    } else if (like === null) {
      next(new NotFoundError('Card not found!'));
    } else {
      throw new Error();
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Invalid info was provided'));
      return;
    }
    next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const dislike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: _id } },
      { new: true },
    ).populate(['likes', 'owner']);

    if (dislike) {
      res.status(200).send(dislike);
    } else if (dislike === null) {
      next(new NotFoundError('Card not found!'));
    } else {
      throw new Error();
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Invalid info was provided'));
      return;
    }
    next(err);
  }
};
