'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    body: DataTypes.TEXT,
    user: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Post.belongsTo(models.User, {foreignKey: 'userId'});
        Post.hasMany(models.Like, {foreignKey: 'likeId'});

      }
    }
  });
  return Post;
};