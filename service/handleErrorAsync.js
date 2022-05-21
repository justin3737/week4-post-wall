const asyncHandleError = (func) => (req, res, next) => {
  func(req, res, next).catch((error) => next(error));
};

module.exports = asyncHandleError;