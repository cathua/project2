module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        userId: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        f_name: DataTypes.STRING,
        l_name: DataTypes.STRING,
        username: DataTypes.STRING,
        hashed_password: DataTypes.STRING,
        salt: DataTypes.STRING
    },
  {
    tableName : 'users',
    underscored: true
  }, {
    classMethods: {
      associate: function(models) {
        // user.belongsToMany(models.meetup, { through: 'userMeetup' })
      }
    }
  });
    return user;
};
