'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middleName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
      set (password) {
        this.setDataValue('hash', this.encodePass(password));
      }
    },
    salt: {
      type: DataTypes.STRING,
      defaultValue: function () {
        return crypto.randomBytes(16).toString('hex');
      }
    }
  });

  User.associate = function (models) {
    // associations can be defined here
  };

  User.prototype.encodePass = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };

  User.prototype.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };

  User.prototype.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
      id: this.id,
      email: this.email,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, 'secret');
  };

  User.prototype.toAuthJSON = function () {
    return {
      id: this.id,
      email: this.email,
      token: this.generateJWT(),
    };
  };

  return User;
};
