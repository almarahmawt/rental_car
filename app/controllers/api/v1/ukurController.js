const carService = require("../../../services/carService");
const fs = require("fs");
const { Ukur } = require("../../../models/ukur");

module.exports = {
  formAdd(req, res) {
    Ukur.findAll({
      order: ["id"],
    }).then((ukur) => {
      res.render("addcar", { ukur });
    });
  },
};
