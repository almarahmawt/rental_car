const express = require("express");
const app = express();
const router = require("../config/routes");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//  view engine
app.set("view engine", "ejs");

// Set format request
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const PUBLIC_DIRECTORY = path.join(__dirname, "./public", "./views");

app.use(express.static(PUBLIC_DIRECTORY));

app.use(express.static("app/public"));
app.use(express.static("app/public/upload"));
app.use(express.static("app/views"));
app.set("views", __dirname + "/views");
/** Install Router */
app.use(router);
router.use(express.urlencoded({ extended: true }));

module.exports = app;
