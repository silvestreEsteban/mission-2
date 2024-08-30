// Import modules
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config(); // This loads environment variables from .env

const app = express(); // I use this to create an instance of Express- or create an express server application and then I configure the MySQL connection pool

const db = mysql.createPool({
  host: process.env.HOST, // Database host
  user: process.env.DB_USERNAME, // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DATABASE, // Name of the database
  port: process.env.DB_PORT, // Database port
  ssl: {
    rejectUnauthorized: true, // SSL configuration - I can use rejectUnauthorized and that will let me access the DB without the DigiCert
  },
}); // I have defined the servers Port in the .env and call it directly where I start the server

// Verify database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
  connection.release(); // Release the connection back to the pool ** My initial thought was that I would want to hold the connection, but if I did that it can cause issues like increased latency
});

// This is where I start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Server is live at http://localhost:${PORT}`
    // `Server is live at http://localhost:${PORT}/claims-calculator/selector_table` // I used this to ensure the data was being returned in browser as I couldn't see it plainly from localhost 3000.
  );
});

app.get("/claims-calculator/selector_table", (req, res) => {
  const sqlQuery = "SELECT * FROM `claims-calculator`.selector_table"; // this is the query I used to call the data from my database.

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      res.status(500).send("Error fetching data");
    } else {
      res.json(results);
    }
    console.log(results);
  });
});

fetch(`http://localhost:3000/claims-calculator/selector_table`) // this fetch works and returns the .json data it displayed in terminal - I just need to do something with it
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
