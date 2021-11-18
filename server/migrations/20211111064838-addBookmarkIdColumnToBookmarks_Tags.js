"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "Bookmarks_Tags",
      "bookmarkId",
      Sequelize.INTEGER
    );
    // bookmarkId를 Bookmarks_Tags Table에 외래키로 지정
    await queryInterface.addConstraint("Bookmarks_Tags", {
      fields: ["bookmarkId"],
      type: "foreign key",
      name: "bookmark_tags_fkey",
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
    // bookmarkId 외래키 조건 삭제
    await queryInterface.removeConstraint(
      "Bookmarks_Tags",
      "bookmark_tags_fkey"
    );
    // bookmarkId 필드 삭제
    await queryInterface.removeColumn("Bookmarks_Tags", "bookmarkId");
  },
};
