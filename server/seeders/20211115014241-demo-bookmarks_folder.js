"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Bookmarks_Folders", [
      {
        bookmarkId: 1,
        folderId: 1,
      },
      {
        bookmarkId: 2,
        folderId: 1,
      },
      {
        bookmarkId: 3,
        folderId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Bookmarks_Folders", null, {});
  },
};
