'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('coffeeshops', [{
        name: "Le Pain Quotidien",
        address: "1961 Chain Bridge Rd",
        city: "Tysons Corner",
        state: "VA",
        latitude: "38.9159306719076",
        longitude: "-77.2230201777054",
        rating: 3,
        price: "$$",
        created_at: new Date(),
        updated_at: new Date()
        },
        {
          name: "Peet's Coffee",
          address: "8150 Leesburg Pike",
          city: "Vienna",
          state: "VA",
          latitude: "38.9164",
          longitude: "-77.22674",
          rating: 4.5,
          price: "$",
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
    return queryInterface.bulkDelete('coffeeshops', null, {});
  }
};
