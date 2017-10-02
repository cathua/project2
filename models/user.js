module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        userId: {
            autoincrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        f_name: DataTypes.STRING,
        l_name: DataTypes.STRING,
        username: DataTypes.STRING,
        hashed_password: DataTypes.STRING
        salt: DataTypes.STRING

    },
  {
    tableName : 'User',
    underscored: true
  }
//associations go here afterwards
);
    return User;
};
