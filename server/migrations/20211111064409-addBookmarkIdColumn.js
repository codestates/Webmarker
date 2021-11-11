'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Bookmarks_Folders 테이블에 bookmarkId 필드 추가
    await queryInterface.addColumn("Bookmarks_Folders", "bookmarkId", Sequelize.INTEGER);

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
    await removeConstraint("Bookmarks_Folders", "bookmark_folders_fkey2");
    // folderId 필드 삭제
    await removeColumn("Bookmarks_Folders", "bookmarkId");
  }
};
