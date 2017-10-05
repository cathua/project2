module.exports = function(sequelize, DataTypes) {
    var userMeetup = sequelize.define('userMeetup', {
        user_id: DataTypes.INTEGER,
        meetup_id: DataTypes.INTEGER
    },
  {
    underscored: true
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
    return userMeetup;
};
