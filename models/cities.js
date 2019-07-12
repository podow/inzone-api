'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cities = sequelize.define('Cities', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});
  Cities.associate = function (models) {
    // associations can be defined here
  };
  return Cities;
};
