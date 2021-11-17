"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Social_Login extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Social_Login.init(
    {
      type: DataTypes.STRING,
      sns_id: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Social_Login",
    }
  );
  return Social_Login;
};
