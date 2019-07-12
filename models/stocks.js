'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stocks = sequelize.define('Stocks', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    background: DataTypes.STRING,
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    workHours: DataTypes.TEXT,
    address: DataTypes.STRING,
    categoryIds: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  Stocks.associate = function (models) {
    // associations can be defined here
  };
  return Stocks;
};
