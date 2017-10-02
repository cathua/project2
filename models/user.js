'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    f_name: DataTypes.STRING,
    l_name: DataTypes.STRING,
    username: DataTypes.STRING,
    hashed_password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};