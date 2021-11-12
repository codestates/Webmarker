'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmarks_Folder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bookmarks_Folder.init({
    id: {
      type: DataTypes.Number,
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'Bookmarks_Folder',
  });
  return Bookmarks_Folder;
};