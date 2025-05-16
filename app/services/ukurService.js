const ukurRepository = require("../repositories/ukurRepository");

module.exports = {
  async list() {
    try {
      const ukur = await ukurRepository.findAll({
        order: ["id"],
      });
      return {
        data: ukur,
      };
    } catch (err) {
      throw err;
    }
  },
};
