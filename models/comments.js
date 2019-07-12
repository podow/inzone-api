'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answerFor: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    published: DataTypes.BOOLEAN,
    for: DataTypes.INTEGER
  }, {});
  Comments.associate = function (models) {
    // associations can be defined here
  };
  return Comments;
};
