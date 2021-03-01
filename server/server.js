var express = require("express");
var app = express();
var fs = require("fs");
var https = require("https");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require("cors");
var moment = require("moment");

const PORT = process.env.PORT || 3050;

// MySQL conecction
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cliente",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// https.createServer({
//   cert: fs.readFileSync,
// });

app.listen(PORT, () => {
  console.log(`Server started in PORT: ${PORT}`);
});

// GET all clients
app.get("/NutriNET/Cliente", (req, res) => {
  const sql = "SELECT * FROM client";

  connection.query(sql, (err, result) => {
    if (err) {
      res.status(err.code || 500).json({
        error: {
          message: err.message,
        },
      });
    }
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send([]);
    }
  });
});

// GET client by ID
app.get("/NutriNET/Cliente/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM client WHERE Cliente_ID = ${id}`;

  connection.query(sql, (err, result) => {
    if (err) {
      res.status(err.code || 500).json({
        error: {
          message: err.message,
        },
      });
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({
        error: {
          message: "Client Not Found",
        },
      });
    }
  });
});

// CREATE client
app.post("/NutriNET/Cliente", (req, res) => {
  const sql = "INSERT INTO client SET ?";

  const clientObj = {
    Nombre_Usuario: req.body["Nombre_Usuario"],
    Contraseña: req.body.Contraseña,
    Nombre: req.body.Nombre,
    Apellidos: req.body.Apellidos,
    Correo_Electronico: req.body["Correo_Electronico"],
    Edad: req.body.Edad,
    Estatura: req.body.Estatura,
    Peso: req.body.Peso,
    IMC: req.body.IMC,
    GEB: req.body.GEB,
    ETA: req.body.ETA,
    Fecha_Creacion: moment().format("YYYY-MM-DD HH:mm:ss"),
    Fecha_Actualizacion: null,
  };

  connection.query(sql, clientObj, (err) => {
    if (err) throw err;
    res.json(clientObj);
  });
});

// UPDATE client
app.put("/NutriNET/Cliente/:id", (req, res) => {
  const { id } = req.params;
  const clientObj = req.body;
  const sql = `UPDATE client SET ? WHERE Cliente_ID = ${id}`;
  clientObj.Fecha_Actualizacion = moment().format("YYYY-MM-DD HH:mm:ss");

  connection.query(sql, clientObj, (err) => {
    if (err) throw err;
    res.json(clientObj);
  });
});

//DELETE client
app.delete("/NutriNET/Cliente/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM client WHERE Cliente_ID = ${id}`;

  connection.query(sql, (err) => {
    if (err) throw err;
    res.send();
  });
});
