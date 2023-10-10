const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const { URL_REGEX } = require('../utils/constants');

const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => /.+@.+\..+/.test(email),
        message: 'Требуется ввести электронный адрес',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'имя пользователя не может быть короче двух символов'],
      maxlength: [30, 'имя пользователя не может быть длиннее 30 символов'],
    },

    about: {
      type: String,
      default: 'Исследователь',
      minlength: [2, 'информация о пользователе не может быть короче двух символов'],
      maxlength: [30, 'информация о пользователе не может быть длиннее 30 символов'],
    },

    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => URL_REGEX.test(url),
        message: 'Требуется ввести URL',
      },
    },
  },

  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this
          .findOne({ email })
          .select('+password')
          .then((user) => {
            if (user) {
              return bcrypt.compare(password, user.password)
                .then((matched) => {
                  if (matched) return user;

                  return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
                });
            }

            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
