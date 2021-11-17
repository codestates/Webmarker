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
    return queryInterface.bulkInsert("Bookmarks", [
      {
        name: "NAVER!",
        url: "www.naver.com",
        content: "세상의 모든 지식",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Google!",
        url: "www.google.com",
        content: "구글은 신이다",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Daum!",
        url: "www.daum.net",
        content: "다음은 다음에",
        createdAt: new Date(),
        updatedAt: new Date(),
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
    return queryInterface.bulkDelete("Bookmarks", null, {});
  },
};
