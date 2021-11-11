'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark_Folder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bookmark_Folder.init({
    id: {
      type: DataTypes.Number,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'Bookmark_Folder',
  });
  return Bookmark_Folder;
};