const express = require("express");
const path = require("path");
const router = express.Router();
const res = require("express/lib/response");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const multer = require("multer");
const fs = require("fs");
const { Cars } = require("../models");
const { Ukur } = require("../models");
const { readFile } = require("fs").promises;

// app.use('/public/images', express.static('images'));

const port = process.env.port || 8015;
router.use(express.static(__dirname + "./public/"));

// Path ke directory public
// Yang bakal kita jadikan public
// Sehingga user bisa akses CSS dan Javascript
// Di browser
const PUBLIC_DIRECTORY = path.join(__dirname, "./public");
const swaggerDocument = YAML.load("./opapi2.yaml");

// Set format request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set PUBLIC_DIRECTORY sebagai
// static files di express
app.use(express.static(PUBLIC_DIRECTORY));
app.use(express.static("public"));
app.use("/public/upload", express.static(__dirname + "/public/upload"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Bilang ke express kalo kita mau
// pake EJS sebagai view engine
app.set("view engine", "ejs");

// upload foto
global.__basedir = __dirname;

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + "/public"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const uploadFile = multer({ storage: diskStorage });

//nampilin halaman landing page
app.get("/", async (request, response) => {
  response.send(await readFile("./public/index.ejs", "utf8"));
});

//nampilin halaman cari mobil
app.get("/cars", async (request, response) => {
  response.send(await readFile("./public/carimobil.ejs", "utf8"));
});

//GET nampilin halaman form add car
app.get("/addcar", (req, res) => {
  Ukur.findAll({
    order: ["id"],
  }).then((ukur) => {
    res.render("addcar", { ukur });
  });
});

// get nampilin halaman index admin
app.get("/admin", async (req, res) => {
  try {
    cars = await Cars.findAll({
      include: [{ model: Ukur, as: "size" }],
    });
    res.render("index", { cars });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET car by ID
app.get("/cars/:id", (req, res) => {
  Cars.findOne({
    where: { id: req.params.id },
  }).then((cars) => {
    res.status(200).json(cars);
  });
});

// POST a cars atau menambahkan car
app.post("/cars/add", uploadFile.single("photo"), (req, res) => {
  Cars.create({
    size_id: req.body.size_id,
    plate: req.body.plate,
    manufacture: req.body.manufacture,
    model: req.body.model,
    photo: req.file.filename,
    rentPerDay: req.body.rentPerDay,
    capacity: req.body.capacity,
    description: req.body.description,
    transmission: req.body.transmission,
    type: req.body.type,
    year: req.body.year,
    options: req.body.options,
    specs: req.body.specs,
    availableAt: req.body.availableAt,
  })
    .then((cars) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      res.status(422).json("Can't create car");
    });
});

// get halaman form update
app.get("/cars/update/:id", async (req, res) => {
  const cars = await Cars.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Ukur,
        as: "size",
      },
    ],
  });

  const coba = await Ukur.findAll();
  res.render("edit", { cars, coba });
});

// update a car
app.post("/cars/update/:id", uploadFile.single("photo"), (req, res) => {
  Cars.update(
    {
      size_id: req.body.size_id,
      plate: req.body.plate,
      manufacture: req.body.manufacture,
      model: req.body.model,
      photo: req.file.filename,
      rentPerDay: req.body.rentPerDay,
      capacity: req.body.capacity,
      description: req.body.description,
      transmission: req.body.transmission,
      type: req.body.type,
      year: req.body.year,
      options: req.body.options,
      specs: req.body.specs,
      availableAt: req.body.availableAt,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then(() => {
      res.redirect("/admin");
    })
    .catch((err) => {
      res.status(422).json("Can't update car");
    });
});

// Delete car by ID
app.get("/cars/delete/:id", (req, res) => {
  Cars.destroy({
    where: { id: req.params.id },
  }).then(() => {
    res.redirect("/admin");
  });
});

// sort atau filter car by id size
app.get("/sort/cars/:id", (req, res) => {
  Cars.findAll({
    order: ["id"],
    where: { size_id: req.params.id },
    include: [{ model: Ukur, as: "size" }],
  }).then((cars) => {
    res.render("index", { cars });
  });
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
