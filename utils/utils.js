// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

module.exports.URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line func-names
module.exports.getJWTSecretKey = function () {
  return NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
};
