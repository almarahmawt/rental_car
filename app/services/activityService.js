const activityRepository = require("../repositories/activityRepository");

module.exports = {
  create(requestBody) {
    return activityRepository.create(requestBody);
  },

  update(id, requestBody) {
    return activityRepository.update(id, requestBody);
  },

  delete(id) {
    return activityRepository.delete(id);
  },

  get(id) {
    return activityRepository.find(id);
  },

  async list() {
    try {
      const cars = await activityRepository.findAll();

      return {
        data: cars,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return activityRepository.find(id);
  },
};
