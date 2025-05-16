const { Activity_logs } = require("../models");

module.exports = {
  create(createArgs) {
    return Activity_logs.create(createArgs);
  },

  update(id, updateArgs) {
    return Activity_logs.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Activity_logs.destroy({ where: { id } });
  },

  find(id) {
    return Activity_logs.findByPk(id);
  },

  findAll() {
    return Activity_logs.findAll();
  },
};
