const handleErrors = (err, req, res, next) => {
  if (err.statusCode !== 500 && err.message) {
    res.status(err.statusCode).send({ message: err.message });
    next();
    return;
  }

  res.status(500).send({ message: `some thing went wrong with the server:  ${err.message}` });

  next();
};

module.exports = { handleErrors };
