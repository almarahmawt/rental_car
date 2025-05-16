const { Cars } = require("../models");
const { Ukur } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  create(createArgs) {
    return Cars.create(createArgs);
  },

  update(id, updateArgs) {
    return Cars.update(updateArgs, {
      where: { id },
    });
  },

  delete(id) {
    return Cars.destroy({
      where: { id },
    });
  },

  find(id) {
    return Cars.findByPk(id);
  },

  // findOne(id) {
  //   return Cars.findOne({
  //     where: { id },
  //     include: [{ model: Ukur, as: "size" }],
  //   });
  // },

  // findAll() {
  //   return Cars.findAll({
  //     include: [{ model: Ukur, as: "size" }],
  //   });
  // },
  find(id) {
    return Cars.findByPk(id);
  },

  findAll() {
    return Cars.findAll({
      include: [{ model: Ukur, as: "size" }],
    });
  },

  async searchCar(requestBody) {
    console.log(requestBody)
    return Cars.findAll({
      include: [{ model: Ukur, as: "size" }],
      where: { 
        driver: requestBody.driver,
        availableAt: {
          [Op.gte]: requestBody.availableAt
        },
        capacity: {
          [Op.gte]: requestBody.capacity
        } 
       }
    });
  },
};
