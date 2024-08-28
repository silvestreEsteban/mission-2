const express = require("express");
const mysql = require("mysql2");
const fs = require("fs");
const { error } = require("console");
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
      fetchedData = data;
      return data;
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

  const lamborghiniYearlyPremium = calculateInsuranceQuote(
    vehicleLamborghini.car_value,
    vehicleLamborghini.risk_rating
  );
  const lamborghiniMonthlyPremium = lamborghiniYearlyPremium / 12;
  const civicYearlyPremium = calculateInsuranceQuote(
    vehicleCivic.car_value,
    vehicleCivic.risk_rating
  );
  const civicMonthlyPremium = civicYearlyPremium / 12;
  console.log(
    `Your ${vehicleLamborghini.car_year} ${vehicleLamborghini.car_make} ${vehicleLamborghini.car_model} is worth a total of $${vehicleLamborghini.car_value}, and you have a Risk Rating of: ${vehicleLamborghini.risk_rating}. Therefore, with our calculations, your yearly premium will be $${lamborghiniYearlyPremium}. Your monthly premium will be $${lamborghiniMonthlyPremium}. Thank you.`
  );
  console.log(
    `Your ${vehicleCivic.car_year} ${vehicleCivic.car_make} ${vehicleCivic.car_model} is worth a total of $${vehicleCivic.car_value}, and you have a Risk Rating of: ${vehicleCivic.risk_rating}. Therefore, with our calculations, your yearly premium will be $${civicYearlyPremium}. Your monthly premium will be $${civicMonthlyPremium}. Thank you.`
  );
  console.table(
    data.map((car) => ({
      Make: car.car_make,
      Model: car.car_model,
      Year: car.car_year,
      Value: car.car_value,
      Risk: car.risk_rating,
      YearlyInsurance: calculateInsuranceQuote(car.car_value, car.risk_rating),
      MonthlyInsurance: monthlyInsuranceQuote(
        calculateInsuranceQuote(car.car_value, car.risk_rating)
      ),
      MonthlyInsuranceRounded: roundNumber(
        monthlyInsuranceQuote(
          calculateInsuranceQuote(car.car_value, car.risk_rating)
        )
      ),
    }))
  );
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

const monthlyInsuranceQuote = (a) => {
  if (typeof a !== "number") {
    return "error";
  }
  return a / 12;
};

const roundNumber = (num) => {
  return parseFloat(num.toFixed(2));
};
console.log(roundNumber(monthlyInsuranceQuote(264.56)));

module.exports = {
  calculateInsuranceQuote,
  fetchData,
  fetchedData,
  monthlyInsuranceQuote,
};
