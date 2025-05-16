const { User } = require("../models");

module.exports = {
  findByEmail(email) {
    return User.findOne({
      where: { email_user: email },
    });
  },

  findPk(id) {
    return User.findByPk(id);
  },
};
