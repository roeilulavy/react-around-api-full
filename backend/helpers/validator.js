const validator = require('validator');

const validateUrl = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true, allow_underscores: true })) {
    return value;
  }
  return helpers.error('string.uri');
};

module.exports = { validateUrl };
