// Import modules
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

// Create an instance of Express
const app = express();

// Create a MySQL connection pool with SSL
const db = mysql.createPool({
  host: process.env.HOST, // Database host
  user: process.env.DB_USERNAME, // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DATABASE, // Name of the database
  port: process.env.DB_PORT, // Database port
  ssl: {
    // SSL configuration
    rejectUnauthorized: true,
  },
});

// Verify database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
  connection.release(); // Release the connection back to the pool
});

// Define a simple route to test the server
app.get("/api/selector_table", (req, res) => {
  res.send("Server is live and connected to the database");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});

// app.get("/api/selector_table", (req, res) => {
//   const sqlQuery = "SELECT * FROM `claims-calculator`.selector_table;";

//   db.query(sqlQuery, (err, results) => {
//     if (err) {
//       console.error("Error fetching data from database:", err);
//       res.status(500).send("Error fetching data");
//     } else {
//       res.json(results);
//     }
//   });
// });
