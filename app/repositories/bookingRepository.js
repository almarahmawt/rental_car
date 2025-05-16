const { Booking } = require("../models");
const { Cars } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  create(createArgs) {
    return Booking.create(createArgs);
  },

  update(id, updateArgs) {
    return Booking.update(updateArgs, {
      where: { id },
    });
  },

  delete(id) {
    return Booking.destroy({
      where: { id },
    });
  },

  find(id) {
    return Booking.findByPk(id);
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
    return Booking.findByPk(id);
  },

  findAll() {
    console.log("Find All Bookings")
    return Booking.findAll({
      include: [{ model: Cars, as: "car" }],
    });
  },
};
