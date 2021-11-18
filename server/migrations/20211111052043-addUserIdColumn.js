"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Folders 테이블에 userId 필드 추가
    await queryInterface.addColumn("Folders", "userId", Sequelize.INTEGER);

    // userId를 Folders Table에 외래키로 지정
    await queryInterface.addConstraint("Folders", {
      fields: ["userId"],
      type: "foreign key",
      name: "folders_fkey",
      references: {
        table: "Users",
        field: "id",
      },
      // 부모테이블 해당하는 id가 삭제되거나 자식테이블의 내용도 삭제및 수정
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // userId 외래키 조건 삭제
    await queryInterface.removeConstraint("Folders", "folders_fkey", {});
    // userId 필드 삭제
    await queryInterface.removeColumn("Folders", "userId");
  },
};
