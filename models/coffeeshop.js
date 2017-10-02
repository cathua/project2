'use strict';
module.exports = (sequelize, DataTypes) => {
  var coffeeshop = sequelize.define('coffeeshop', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    price: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return coffeeshop;
};