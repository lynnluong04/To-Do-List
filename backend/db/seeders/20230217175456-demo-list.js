'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      */
      options.tableName = 'Lists'
      return queryInterface.bulkInsert('Lists', [{
        name: 'Demo List',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      */
      options.tableName = 'Lists'
      return queryInterface.bulkDelete('Lists', null, {});
  }
};
