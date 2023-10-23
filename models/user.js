const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unathorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Квентин Тарантино',
    minlength: [2, 'поле должно содержать минимум 2 символа'],
    maxlength: [30, 'максимальная длина поля 30 символов'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: ({ value }) => `${value} - некорректный адрес email`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { toObject: { useProjection: true }, toJSON: { useProjection: true } });

// eslint-disable-next-line func-names
userSchema.statics.findUser = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильная почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильная почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
