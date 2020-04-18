const handleRejection = (fn) => {
  return (req, res, next) => {
    const response = fn(req, res, next);
    if (response && response.catch) {
      return response.catch(e => next(e));
    }
    return next(response);
  }
};

module.exports = handleRejection;
