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
        meetup.belongsToMany('user', { through: 'userMeetup' })
        meetup.hasOne('coffeeshop', { foreignKey: 'coffeeshop_id' })
      }
    }
  });
  return meetup;
};
