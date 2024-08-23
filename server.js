const express = require("express");
const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();
const app = express();

const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DATABASE = process.env.MYSQL_DATABASE;
const PORT = process.env.PORT;

const myPool = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  port: 3306,
  ssl: { ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem") },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/", (req, res) => {
  console.log("/ endpoint was hit");
  myPool.query("SELECT * FROM cars", (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.get("/car_value", (req, res) => {
  console.log("/car_value endpoint was hit");
  myPool.query("SELECT car_value FROM cars", (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

// PORT //

app
  .listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
  })
  .on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.log("Port is already in use");
    } else {
      console.log("Server Error", error);
    }
  });
