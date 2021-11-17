"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
// 데이터베이스와 연결을 진행합니다.
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable],
    config
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
//models 폴더 내부에 존재하는 파일들을 읽어와 findOne, findAll과 같은 함수를 실행할수 있게끔 모델 인스턴스를 생성합니다.
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    //db.users와 같이 db 객체 내부에 모델 인스턴스를 저장합니다.
    db[model.name] = model;
  });
//associate 부분에 내용이 존재한다면 자동으로 관계를 형성합니다.
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 테이블 간 관계 정의
const { User, Folder, Bookmark, Tag, Social_Login } =
  sequelize.models;
// 폴더 모델은 유저 모델에 종속되며
Folder.belongsTo(User);
// 유저 모델은 여러개의 폴더 모델을 가질 수 있다.
User.hasMany(Folder);
// 폴더와 북마크는 M:N
Folder.belongsToMany(Bookmark, {
  through: "Bookmarks_Folders",
  as: "Bookmarks",
  foreignKey: "folderId",
});
Bookmark.belongsToMany(Folder, {
  through: "Bookmarks_Folders",
  as: "Folders",
  foreignKey: "bookmarkId",
});
// 북마크와 태그는 M:N
Bookmark.belongsToMany(Tag, {
  through: "Bookmarks_Tags",
  as: "Tags",
  foreignKey: "bookmarkId",
});
Tag.belongsToMany(Bookmark, {
  through: "Bookmarks_Tags",
  as: "Bookmarks",
  foreignKey: "tagId",
});

// 유저와 소셜로그인 테이블 1:N
Social_Login.belongsTo(User);
User.hasMany(Social_Login);
module.exports = db;
