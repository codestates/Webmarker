"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Bookmarks_Folders 테이블에 folderId 필드 추가
    await queryInterface.addColumn("Bookmarks_Folders", "folderId", Sequelize.INTEGER);

    // folderId를 Bookmarks_Folders Table에 외래키로 지정
    await queryInterface.addConstraint("Bookmarks_Folders", {
      fields: ["folderId"],
      type: "foreign key",
      name: "bookmark_folders_fkey",
      references: {
        table: "Folders",
        field: "id",
      },
      // 부모테이블 해당하는 id가 삭제되거나 자식테이블의 내용도 삭제및 수정
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // folderId 외래키 조건 삭제
    await queryInterface.removeConstraint("Bookmarks_Folders", "bookmark_folders_fkey", {});
    // folderId 필드 삭제
    await queryInterface.removeColumn("Bookmarks_Folders", "folderId");
  },
};
