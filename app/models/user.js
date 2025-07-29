"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsTo(models.Type_user, {
        foreignKey: "id_type",
      });
    }
  }
  User.init(
    {
      id_type: DataTypes.INTEGER,
      email_user: DataTypes.STRING,
      password_user: DataTypes.STRING,
      name: DataTypes.STRING,
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
