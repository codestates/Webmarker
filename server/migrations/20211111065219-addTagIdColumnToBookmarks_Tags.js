"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Bookmarks_Tags 테이블에 tagId 필드 추가
    await queryInterface.addColumn("Bookmarks_Tags", "tagId", Sequelize.INTEGER);

    // tagId를 Bookmarks_Tags Table에 외래키로 지정
    await queryInterface.addConstraint("Bookmarks_Tags", {
      fields: ["tagId"],
      type: "foreign key",
      name: "bookmark_tags_fkey2",
      references: {
        table: "Tags",
        field: "id",
      },
      // 부모테이블 해당하는 id가 삭제되거나 자식테이블의 내용도 삭제및 수정
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // tagId 외래키 조건 삭제
    await queryInterface.removeConstraint("Bookmarks_Tags", "bookmark_tags_fkey2");
    // tagId 필드 삭제
    await queryInterface.removeColumn("Bookmarks_Tags", "tagId");
  },
};
