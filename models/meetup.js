'use strict';
module.exports = (sequelize, DataTypes) => {
  var meetup = sequelize.define('meetup', {
    datetime: DataTypes.STRING,
    accepted: DataTypes.BOOLEAN,
    coffeeshop_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // meetup.belongsToMany(db.user, { through: 'userMeetup' })
        // meetup.hasOne('coffeeshop', { foreignKey: 'coffeeshop_id' })
      }
    }
  });
  return meetup;
};
