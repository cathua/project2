'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('meetups', [{
      datetime: new Date(),
      accepted: false,
      coffeeshop_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      datetime: new Date(),
      accepted: false,
      coffeeshop_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
    return queryInterface.bulkDelete('meetups', null, {});
<<<<<<< HEAD
=======

>>>>>>> bc4a75d9a9fda17386c5cd033fa471916e0e668e
  }
};
