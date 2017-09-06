'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    body: DataTypes.TEXT,
    user: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Post.belongsTo(models.User, {foreignKey: 'userId'});

      }
    }
  });
  return Post;
};