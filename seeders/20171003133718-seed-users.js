'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      f_name: 'Catherine',
      l_name: 'Hua',
      username: 'huawkward',
      hashed_password: '$2a$10$fngbW9FEqxQElRbZ7oHyJOaVxHWfF4htpXrTmAmQDCLAEqLQbDVbu',
      salt: '$2a$10$fngbW9FEqxQElRbZ7oHyJO',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      f_name: 'Mingquan',
      l_name: 'Ma',
      username: 'mingqma',
      hashed_password: '$2a$10$O8C3DwCea/zEeMUdfiH38enMb7mDLMkvcEbAlaCtDIKtMvrZqqfFu',
      salt: '$2a$10$O8C3DwCea/zEeMUdfiH38e',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      f_name: 'Schmitty',
      l_name: 'Test',
      username: 'schmitty',
      hashed_password: '$2a$10$P9syWCbyiNAu9iXc9ymU0OhT3s0o9xqJGFqxCend4K6.dTmv45/h.',
      salt: '$2a$10$P9syWCbyiNAu9iXc9ymU0O',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      f_name: 'Testy',
      l_name: 'McTesterson',
      username: 'moretesting',
      hashed_password: '$2a$10$JA5H/8zM/v2LZb97pcCzMuWxEXvIB1e0omc3hLEM0Qj1GYI84DfwG',
      salt: '$2a$10$JA5H/8zM/v2LZb97pcCzMu',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
