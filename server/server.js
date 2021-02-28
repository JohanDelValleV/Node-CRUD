var express = require("express");
var app = express();
var fs = require("fs");
var https = require("https");
var mysql = require("mysql");
var bodyParser = require("body-parser");

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

// https.createServer({
//   cert: fs.readFileSync,
// });

app.listen(PORT, () => {
  console.log(`Server started in PORT: ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

// GET all clients
app.get("/clients", (req, res) => {
  const sql = "SELECT * FROM client";

  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send("No clients");
    }
  });
});

// GET client by ID
app.get("/clients/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM client WHERE Cliente_ID = ${id}`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send("No client found");
    }
  });
});

// CREATE client
app.post("/clients", (req, res) => {
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
    Fecha_Creacion: req.body["Fecha_Creacion"],
    Fecha_Actualizacion: req.body["Fecha_Actualizacion"],
  };

  connection.query(sql, clientObj, (err) => {
    if (err) throw err;
    res.json(clientObj);
  });
});

// UPDATE client
app.put("/clients/:id", (req, res) => {
  const { id } = req.params;
  const clientObj = req.body;
  const sql = `UPDATE client SET ? WHERE Cliente_ID = ${id}`;

  connection.query(sql, clientObj, (err) => {
    if (err) throw err;
    res.json(clientObj);
  });
});

//DELETE client
app.delete("/clients/:id", async (req, res) => {
  const { id } = await req.params;
  const sql = `DELETE FROM client WHERE Cliente_ID = ${id}`;

  connection.query(sql, (err) => {
    if (err) throw err;
    res.send("Cliente eliminado");
  });
});
