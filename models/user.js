'use strict';

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
      allowNull: false
    }
  });

  User.associate = function (models) {
    // associations can be defined here
  };

  return User;
};