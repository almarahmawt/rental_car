const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../../models");
// const { Cars } = require("../../../models");
// const { Ukur } = require("../../../models");
// const carService = require("../../../services/carService");
const { readFile } = require("fs").promises;
const SALT = 10;
const userService = require("../../../services/userService");

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
}

function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(isPasswordCorrect);
    });
  });
}

function createToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET || "Rahasia");
}

function verifyToken(token) {
  return jwt.verify(data, process.env.JWT_SECRET || "Rahasia");
}

module.exports = {
  encryptPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, SALT, (err, encryptedPassword) => {
        if (!!err) {
          reject(err);
          return;
        }

        resolve(encryptedPassword);
      });
    });
  },

  async formLogin(req, res) {
    res.render("login");
  },

  async formRegis(req, res) {
    res.render("register");
  },

  async dashSuperAdmin(req, res) {
    res.render("dashboardSA");
  },

  async formRegisterAdmin(req, res) {
    res.render("formRegisAdmin");
  },

  async main(req, res) {
    res.render("home", {
      user: req.user || null
    });
  },

  async searchCar(req, res) {
    const cars=[]
    res.render("cari", { cars,   user: req.user || null});
  },

  async registerMember(req, res) {
    console.log(req.body)
    const email_user = req.body.email;
    const name = req.body.name;
    const phone_number = req.body.phone;
    const id_type = req.body.id_type;

    const password_user = await encryptPassword(req.body.password);
    if (req.body.password === "") {
      res.status(422).json({
        status: "FAIL",
        message: "Password is required",
      });
      return;
    }
    userService
      .create({ id_type, email_user, password_user, name, phone_number })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async registerAdmin(req, res) {
    const email_user = req.body.email;
    const id_type = req.body.id_type;
    const password_user = await encryptPassword(req.body.password);
    if (req.body.password === "") {
      res.status(422).json({
        status: "FAIL",
        message: "Password is required",
      });
      return;
    }

    userService
      .create({ id_type, email_user, password_user })
      .then((post) => {
        res.redirect("/dashboard-SuperAdmin");
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async login(req, res) {
    const email_user = req.body.email; // Biar case insensitive
    const password_user = req.body.password;

    const user = await User.findOne({
      where: { email_user },
    });

    if (!user) {
      res.status(404).json({ message: "Email tidak ditemukan" });
      return;
    }

    const isPasswordCorrect = await checkPassword(
      user.password_user,
      password_user
    );

    //create token
    const token = createToken({
      id: user.id,
      id_type: user.id_type,
      email: user.email_user,
      name: user.name,
      phone_number: user.phone_number,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Password salah!" });
      return;
    }
    res.cookie("jwt", token, { httpOnly: true });
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_SIGNATURE_KEY || "Rahasia",
        (err, decodedToken) => {
          if (err) {
            console.log(err, message);
            res.redirect("/");
          } else {
            console.log(decodedToken);
            const role = decodedToken.id_type;
            if (role == "1") {
              res.redirect("/dashboard-SuperAdmin");
            } else if (role == "2") {
              res.redirect("/cars");
            } else {
              res.redirect("/home");
            }
          }
        }
      );
    } else {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async whoAmI(req, res) {
    if (req.User.id_type === 3) {
      res.status(200).json({
        status: "OK",
        data: req.User,
        message: "You are a member",
      });
    } else if (req.User.id_type === 2) {
      res.status(200).json({
        status: "OK",
        data: req.User,
        message: "You are an admin",
      });
    } else if (req.User.id_type === 1) {
      res.status(200).json({
        status: "OK",
        data: req.User,
        message: "You are a super admin",
      });
    }
  },

  async logout(req, res) {
    res.clearCookie("jwt");
    res.cookie("express.sid", "", { expires: new Date() });
    res.redirect("/");
  },
};
