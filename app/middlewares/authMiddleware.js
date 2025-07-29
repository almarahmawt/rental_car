const jwt = require("jsonwebtoken");
const userController = require("../controllers/api/v1/authController");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SIGNATURE_KEY || "Rahasia",
      (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect("/login");
        } else {
          console.log(decodedToken);
          next();
        }
      }
    );
  } else {
    res.redirect("/login");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SIGNATURE_KEY || "Rahasia");
      let user = decoded
      if (!user) {
        req.user = null;
      }
      req.user = user; 
      next();
    } catch (err) {
      console.error("Invalid token:", err.message);
      req.user = null;
      next();
    }
  } else {
    req.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
