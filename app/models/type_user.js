"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Type_user.hasMany(models.User, {
        foreignKey: "id_type",
      });
    }
  }
  Type_user.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Type_user",
    }
  );
  return Type_user;
};
