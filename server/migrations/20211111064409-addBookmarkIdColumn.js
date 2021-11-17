"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "Bookmarks_Folders",
      "bookmarkId",
      Sequelize.INTEGER
    );
    // bookmarkId를 Bookmarks_Folders Table에 외래키로 지정
    await queryInterface.addConstraint("Bookmarks_Folders", {
      fields: ["bookmarkId"],
      type: "foreign key",
      name: "bookmark_folders_fkey2",
      references: {
        table: "Bookmarks",
        field: "id",
      },
      // 부모테이블 해당하는 id가 삭제되거나 자식테이블의 내용도 삭제및 수정
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // folderId 외래키 조건 삭제
    await queryInterface.removeConstraint(
      "Bookmarks_Folders",
      "bookmark_folders_fkey2",
      {}
    );
    // folderId 필드 삭제
    await queryInterface.removeColumn(
      "Bookmarks_Folders",
      "bookmarkId"
    );
  },
};
