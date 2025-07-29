const bookingRepository = require("../repositories/bookingRepository");

module.exports = {
  create(requestBody) {
    return bookingRepository.create(requestBody);
  },

  update(id, requestBody) {
    return bookingRepository.update(id, requestBody);
  },

  delete(id) {
    return bookingRepository.delete(id);
  },

  get(id) {
    return bookingRepository.find(id);
  },

  async searchByCar(search) {
    try {
      const bookings = await bookingRepository.searchByCar(search);
      return {
        bookings,
      };
    } catch (err) {
      throw err;
    }
  },

  async list() {
    try {
      const bookings = await bookingRepository.findAll();
      return {
        bookings,
      };
    } catch (err) {
      throw err;
    }
  },
};
