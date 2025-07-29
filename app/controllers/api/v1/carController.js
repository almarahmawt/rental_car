const carService = require("../../../services/carService");
const ukurService = require("../../../services/ukurService");
const { readFile } = require("fs").promises;
const activityService = require("../../../services/activityService");
const user = require("../../../models/user");

module.exports = {
  async formAdd(req, res) {
    res.send(await readFile("./app/views/addcar.ejs", "utf8"));
  },

  async formBooking(req, res) {
    console.log("User from token in booking page:", req.user);
    const cars = await carService.get(req.params.id);
    const coba = await ukurService.list();
    const user = req.user || null;
    if(!req.user) {
      return res.redirect("/login");
    } else {
      res.render("formBookingCars", { cars, coba, user });
    }
  },

  async formUpdate(req, res) {
    const cars = await carService.get(req.params.id);
    const coba = await ukurService.list();
    res.render("edit", { cars, coba });
  },

  async dataCars(req, res) {
    carService
      .list()
      .then(({ cars }) => {
        res.status(200).json({
          status: "Success",
          data: cars
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async listCar(req, res) {
    carService
      .list()
      .then(({ cars }) => {
        res.render("./index", { cars });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async sortCars(req, res) {
    carService
      .sort(req.params.id)
      .then(({ cars }) => {
        res.render("./index", { cars });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  createCar(req, res) {
    carService
      .create({
        driver: req.body.driver,
        size_id: req.body.size_id,
        plate: req.body.plate,
        manufacture: req.body.manufacture,
        model: req.body.model,
        photo: req.file.filename,
        rentPerDay: req.body.rentPerDay,
        capacity: req.body.capacity,
        description: req.body.description,
        transmission: req.body.transmission,
        type: req.body.type,
        year: req.body.year,
        options: req.body.options,
        specs: req.body.specs,
        availableAt: req.body.availableAt,
      })
      .then((Car) => {
        res.redirect("/cars");
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async findCar(req, res) {
    try {
      const driverBool = req.body.driver === "true";
      const { cars } = await carService.search({
        available: true,
        driver: driverBool,
        dateTime: req.body.tanggal,
        capacity: req.body.penumpang
      });
      res.render("./cari", { cars, user: req.user || null });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async updateCar(req, res) {
    try {
      const driverBool = req.body.driver === "true";
      const availBool = req.body.available === "true";
      carService
      .update(req.params.id, {
        driver: driverBool,
        size_id: req.body.size_id,
        plate: req.body.plate,
        manufacture: req.body.manufacture,
        model: req.body.model,
        photo: req.file.filename,
        rentPerDay: req.body.rentPerDay,
        capacity: req.body.capacity,
        description: req.body.description,
        transmission: req.body.transmission,
        type: req.body.type,
        year: req.body.year,
        options: req.body.options,
        specs: req.body.specs,
        availableAt: req.body.availableAt,
        available: availBool,
      })
      .then(() => {
        res.redirect("/cars");
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async showCar(req, res) {
    carService
        .get(req.params.id)
        .then((Car) => {
          res.status(200).json({
            status: "OK",
            data: Car,
          });
        })
        .catch((err) => {
          res.status(422).json({
            status: "FAIL",
            message: err.message,
          });
        });
  },

  async destroyCar(req, res) {
    carService
      .delete(req.params.id)
      .then((Car) => {
        res.redirect("/cars");
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
