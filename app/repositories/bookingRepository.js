const { Booking } = require("../models");
const { Cars } = require("../models");
const { Op, fn, col, where } = require('sequelize');

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

  searchByCar(search) {
    return Booking.findAll({
      include: [{
        model: Cars,
        as: "car",
        where: {
          [Op.or]: [
            where(fn('LOWER', col('car.manufacture')), {
              [Op.like]: `%${search.toLowerCase()}%`
            }),
            where(fn('LOWER', col('car.model')), {
              [Op.like]: `%${search.toLowerCase()}%`
            })
          ]
        }
      }]
    });
  },

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
