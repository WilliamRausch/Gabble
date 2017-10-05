'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    user: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      Like.belongsTo(models.User,{as: 'User',foreignKey: 'userId',})
    Like.belongsTo(models.Message,{as: 'Message',foreignKey: 'messageId'})
      }
    }
  });
  return Like;
};