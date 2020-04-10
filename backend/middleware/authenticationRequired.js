const { getUserByAuthId } = require('../resources/Users')

const authenticationRequired = (req, res, next) => {
  if (req.session.userId) {
    return getUserByAuthId({ userAuthId: req.session.userId })
      .then((user) => {
        if (user) {
          req.authenticatedUser = user;
          return next();
        } else {
          res.status(401);
          return res.json({error: 'Unauthorized'});
        }
      })
  }
  res.status(401);
  return res.json({error: 'Unauthorized'});
};

module.exports = authenticationRequired;
