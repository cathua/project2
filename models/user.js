module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        userId: {
            autoincrement: true,
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
    underscored: false
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        user.belongsToMany('meetup', { through: 'userMeetup' })
      }
    }
  });
    return user;
};
