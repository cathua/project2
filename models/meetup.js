'use strict';
module.exports = (sequelize, DataTypes) => {
  var meetup = sequelize.define('meetup', {
    datetime: DataTypes.STRING,
    accepted: DataTypes.BOOLEAN,
    coffeeshop_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return meetup;
};