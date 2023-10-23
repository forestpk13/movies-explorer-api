const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unathorizedError');
const { getJWTSecretKey } = require('../utils/utils');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  let payload;

  try {
    const secretKey = getJWTSecretKey();
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;
  next();
};
