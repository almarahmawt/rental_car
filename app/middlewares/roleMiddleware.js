const jwt = require("jsonwebtoken");

module.exports = {
  async authorizeSuperAdmin(req, res, next) {
    try {
      const token = req.cookies.jwt;
      //cek token
      if (token) {
        jwt.verify(
          token,
          process.env.JWT_SIGNATURE_KEY || "Rahasia",
          (err, decodedToken) => {
            if (err) {
              console.log(err, message);
              res.redirect("/login");
            } else {
              const role = decodedToken.id_type;
              if (role == "1") {
                next();
              } else if (role == "2") {
                res.redirect("/api/v1/cars");
              } else {
                res.redirect("/");
              }
            }
          }
        );
      }
    } catch (err) {
      console.error(err);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },

  async authorizeAdmin(req, res, next) {
    try {
      const token = req.cookies.jwt;
      //cek token
      if (token) {
        jwt.verify(
          token,
          process.env.JWT_SIGNATURE_KEY || "Rahasia",
          (err, decodedToken) => {
            if (err) {
              console.log(err, message);
              res.redirect("/login");
            } else {
              const role = decodedToken.id_type;
              if (role == "1" || role == "2") {
                next();
              } else {
                res.redirect("/home");
              }
            }
          }
        );
      }
    } catch (err) {
      console.error(err);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },
};
