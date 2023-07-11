const users = require('express').Router();

const {
  updateUserInfo,
  getOwnProfile,
} = require('../controllers/users');
const { validateUserInfo } = require('../utils/validators/userValidators');

users.get('/me', getOwnProfile);
users.patch('/me', validateUserInfo, updateUserInfo);

module.exports = users;
