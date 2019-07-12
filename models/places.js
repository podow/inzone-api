'use strict';
module.exports = (sequelize, DataTypes) => {
  const Places = sequelize.define('Places', {
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    published : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    phones: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:  false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stocksIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    }
  }, {});
  Places.associate = function (models) {
    // associations can be defined here
  };
  return Places;
};
