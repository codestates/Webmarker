"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookmarks_Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookmarks_Tag.init(
    {
      bookmarkId: {
        type: DataTypes.INTEGER,
      },
      tagId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Bookmarks_Tag",
    }
  );
  return Bookmarks_Tag;
};
