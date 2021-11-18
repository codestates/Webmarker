"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return await queryInterface.bulkInsert("Folders", [
      {
        name: "folder-01",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        name: "folder-02",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("Folders", null, {});
  },
};
