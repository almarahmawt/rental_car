"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Cars.belongsTo(models.Ukur, {
        foreignKey: "size_id",
        as: "size",
      });
    }
  }
  Cars.init(
    {
      size_id: DataTypes.INTEGER,
      driver: DataTypes.BOOLEAN,
      plate: DataTypes.STRING,
      manufacture: DataTypes.STRING,
      model: DataTypes.STRING,
      photo: DataTypes.STRING,
      rentPerDay: DataTypes.INTEGER,
      capacity: DataTypes.INTEGER,
      description: DataTypes.STRING,
      transmission: DataTypes.STRING,
      type: DataTypes.STRING,
      year: DataTypes.STRING,
      options: DataTypes.STRING,
      specs: DataTypes.STRING,
      availableAt: DataTypes.DATE,
      available: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Cars",
    }
  );
  return Cars;
};
