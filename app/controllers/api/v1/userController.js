const userService = require("../../../services/userService");

module.exports = {
  async list(req, res) {
    if (req.User.id_type === 1) {
      userService
        .list()
        .then(({ data }) => {
          res.status(200).json({
            status: "OK",
            data: data,
          });
        })
        .catch((err) => {
          res.status(400).json({
            status: "FAIL",
            message: err.message,
          });
        });
    } else {
      res.status(403).json({
        status: "FAIL",
        message: "You are not authorized to perform this action",
      });
    }
  },

  async show(req, res) {
    if (req.User.id_type === 1) {
      userService
        .find(req.params.id)
        .then((User) => {
          res.status(200).json({
            status: "OK",
            data: User,
          });
        })
        .catch((err) => {
          res.status(422).json({
            status: "FAIL",
            message: err.message,
          });
        });
    } else {
      res.status(403).json({
        status: "FAIL",
        message: "You are not authorized to perform this action",
      });
    }
  },

  async destroy(req, res) {
    if (req.User.id_type === 1) {
      userService
        .delete()
        .then(() => {
          res.status(200).json({
            status: "OK",
            message: "User deleted successfully",
          });
        })
        .catch((err) => {
          res.status(422).json({
            status: "FAIL",
            message: err.message,
          });
        });
    } else {
      res.status(403).json({
        status: "FAIL",
        message: "You are not authorized to perform this action",
      });
    }
  },
};
