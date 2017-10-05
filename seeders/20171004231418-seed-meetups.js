'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('meetups', [{
      datetime: '2017-10-3 17:00:00',
      accepted: false,
      coffeeshop_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      datetime: '2017-4-20 16:20:20',
      accepted: false,
      coffeeshop_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
    return queryInterface.bulkDelete('meetups', null, {});
  }
};
