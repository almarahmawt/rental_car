const ukur = require("../models/ukur");
const carsRepository = require("../repositories/carRepository");

module.exports = {
  create(requestBody) {
    return carsRepository.create(requestBody);
  },

  update(id, requestBody) {
    console.log(requestBody);
    return carsRepository.update(id, requestBody);
  },

  delete(id) {
    return carsRepository.delete(id);
  },

  get(id) {
    return carsRepository.find(id);
  },

  async search(requestBody) {
    try {
      const cars = await carsRepository.searchCar({
          available: requestBody.available,
          driver: requestBody.driver,
          availableAt: requestBody.dateTime,
          capacity: requestBody.capacity
      });
      return {
        cars
      };
    }catch(err){
      throw err;
    }
  },

  async list() {
    try {
      const cars = await carsRepository.findAll();
      return {
        cars,
      };
    } catch (err) {
      throw err;
    }
  },
};
