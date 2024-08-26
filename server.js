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

app.get("/quote_information", (req, res) => {
  myPool.query(
    `SELECT car_value, risk_rating, car_make, car_model, car_year FROM cars`,
    (err, result) => {
      if (err) return console.log(err);
      res.send(result);
    }
  );
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

let fetchedData = [];

const fetchData = () => {
  return fetch(`HTTP://localhost:${PORT}/quote_information`)
    .then((response) => response.json())
    .then((data) => {
      fetchedData = data; // Store the fetched data in the higher scope variable
      return data; // Return the data for further use if needed
    })
    .catch((error) => console.error("Error fetching data", error));
};

// Call the fetchData function to fetch and store the data
fetchData().then((data) => {
  const [
    vehicleCivic,
    vehicleMaserati,
    vehicleLamborghini,
    vehicleSkyline,
    vehicleSubaruWRX,
    vehicleHyundai,
    vehicleSuzuki,
    vehicleCorolla,
    vehicleEvo,
    vehicleSupra,
  ] = data;

  console.log(vehicleCivic, vehicleEvo);
});
// FUNCTION FOR UNIT TESTS
const calculateInsuranceQuote = (carValue, riskRating) => {
  if (
    typeof carValue !== "number" ||
    typeof riskRating !== "number" ||
    riskRating < 1 ||
    riskRating > 5 ||
    carValue < 0
  ) {
    return "incorrect input";
  }

  let yearlyPremium = (carValue * riskRating) / 100;
  let monthlyPremium = yearlyPremium / 12;
  return yearlyPremium;
};

module.exports = { calculateInsuranceQuote, fetchData, fetchedData };
