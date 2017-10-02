'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      f_name: {
        type: Sequelize.STRING
      },
      l_name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      hashed_password: {
        type: Sequelize.STRING
      },
      salt: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
