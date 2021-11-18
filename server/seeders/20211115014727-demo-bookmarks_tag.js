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
    await queryInterface.bulkInsert("Bookmarks_Tags", [
      {
        bookmarkId: 1,
        tagId: 1,
      },
      {
        bookmarkId: 1,
        tagId: 2,
      },
      {
        bookmarkId: 2,
        tagId: 3,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Bookmarks_Tags", null, {});
  },
};
