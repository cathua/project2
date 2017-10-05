'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('userMeetups', [{
      user_id: 1,
      meetup_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: 2,
      meetup_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: 3,
      meetup_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: 4,
      meetup_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('userMeetups', null, {});

  }
};
