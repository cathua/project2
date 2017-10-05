'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('meetups', [{
      datetime: "10-3-2017 10:38:01",
      accepted: false,
      coffeeshop_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      datetime: "10-4-2017 4:20:20",
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
