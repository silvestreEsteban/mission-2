// // Import modules
// const express = require("express");
// const mysql = require("mysql2");
// const dotenv = require("dotenv");
// const fs = require("fs");
// const path = require("path");

// // Load environment variables from .env
// dotenv.config();

// // Create an instance of Express
// const app = express();

// // Create a MySQL connection pool with SSL
// const db = mysql.createPool({
//   host: process.env.HOST,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DATABASE,
//   port: process.env.DB_PORT,
//   ssl: {
//     ca: fs.readFileSync("./cert/DigiCertGlobalRootCA.crt.pem"),
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   },
// });

// // Verify database connection
// db.getConnection((err, connection) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
//   console.log("Connected to the database");
//   connection.release(); // Release the connection back to the pool
// });

// // Start the server
// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server is live at http://localhost:${PORT}`);
// });

// // Define risk levels
// let rating = 0; // Declare rating globally

// const lowRiskDriver = rating <= 1;
// const lowModerateRiskDriver = rating > 1 && rating <= 2;
// const moderateRiskDriver = rating === 3;
// const moderateHighRiskDriver = rating > 3 && rating <= 4;
// const highRiskDriver = rating >= 5;

// // Function to determine driver rating
// function rateTheDriver({ accidents, claims }) {
//   if (accidents === 5 && claims === 3) {
//     rating = 5;
//   } else if (accidents === 0 && claims === 0) {
//     rating = 1;
//   } else if (accidents === 1 && claims === 1) {
//     rating = 2;
//   } else if (accidents === 2 && claims === 1) {
//     rating = 3;
//   } else {
//     rating = 4; // Assuming any other case is moderate-high risk
//   }

//   return { rating };
// }

// // Route to fetch customer data, calculate rating, return it, and update the database
// app.get("/claims-calculator/selector_table", (req, res) => {
//   const sqlQuery =
//     "SELECT customerID, accidents, claims FROM `claims-calculator`.selector_table";

//   db.query(sqlQuery, (err, results) => {
//     if (err) {
//       console.error("Error fetching data from database:", err);
//       res.status(500).send("Error fetching data");
//     } else {
//       const customersWithRatings = results.map((customer) => {
//         const { rating } = rateTheDriver(customer);

//         // Update the database with the new rating
//         const updateQuery =
//           "UPDATE `claims-calculator`.selector_table SET rating = ? WHERE customerID = ?";
//         db.query(updateQuery, [rating, customer.customerID], (updateErr) => {
//           if (updateErr) {
//             console.error("Error updating data in database:", updateErr);
//           }
//         });

//         return { ...customer, rating }; // Add rating to the customer object
//       });

//       res.json(customersWithRatings);
//     }
//   });
// });
// ************************************ Above has been changed substantially, and doesn't resemble my initial code anymore *****************************************

// *************** .env excessive******************
// # # MySQL Connection
// # HOST=mssion2-db.mysql.database.azure.com
// # DB_PORT=3306
// # DB_USERNAME=Glen_for_mission2
// # DB_PASSWORD=AxethePir8*
// # DATABASE=claims-calculator

// # # SSL Certificate Paths
// # # SSL_CERT_PATH=cert/DigiCertGlobalRootCA.crt.pem
// # # # SSL_KEY_PATH=cert/your_private_key.key
// # # # SSL_CA_PATH=cert/your_ca_certificate.crt

// # # Server Port
// # PORT=3000
// *****************************************************************************************************************************************************************

// // Import modules
// const express = require("express");
// const mysql = require("mysql2");
// const dotenv = require("dotenv");

// // Load environment variables from .env
// dotenv.config();

// // Create an instance of Express
// const app = express();

// // Create a MySQL connection pool with SSL
// const db = mysql.createPool({
//   host: process.env.HOST, // Database host
//   user: process.env.DB_USERNAME, // Database username
//   password: process.env.DB_PASSWORD, // Database password
//   database: process.env.DATABASE, // Name of the database
//   port: process.env.DB_PORT, // Database port
//   ssl: {
//     // SSL configuration
//     rejectUnauthorized: true,
//   },
// });

// // Verify database connection
// db.getConnection((err, connection) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
//   console.log("Connected to the database");
//   connection.release(); // Release the connection back to the pool
// });

// // Start the server
// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server is live at http://localhost:${PORT}`);
// });

// // Function to determine driver rating
// function rateTheDriver({ accidents, claims }) {
//   let rating = 4; // Default rating

//   if (accidents === 5 && claims === 3) {
//     rating = 5;
//   } else if (accidents === 0 && claims === 0) {
//     rating = 1;
//   } else if (accidents === 1 && claims === 1) {
//     rating = 2;
//   } else if (accidents === 2 && claims === 1) {
//     rating = 3;
//   }

//   // Define risk levels based on the rating
//   const lowRiskDriver = rating <= 1;
//   const lowModerateRiskDriver = rating > 1 && rating <= 2;
//   const moderateRiskDriver = rating === 3;
//   const moderateHighRiskDriver = rating > 3 && rating <= 4;
//   const highRiskDriver = rating >= 5;

//   return {
//     rating,
//     lowRiskDriver,
//     lowModerateRiskDriver,
//     moderateRiskDriver,
//     moderateHighRiskDriver,
//     highRiskDriver,
//   };
// }

// // Route to fetch customer data, calculate rating, return it, and update the database
// app.get("/api/claims-calculator/selector_table", (req, res) => {
//   const sqlQuery =
//     "SELECT customerID, numberOfAccidents, numberOfClaims FROM `claims-calculator`.selector_table";

//   db.query(sqlQuery, (err, results) => {
//     if (err) {
//       console.error("Error fetching data from database:", err);
//       res.status(500).send("Error fetching data");
//     } else {
//       const customersWithRatings = results.map((customer) => {
//         const {
//           rating,
//           lowRiskDriver,
//           lowModerateRiskDriver,
//           moderateRiskDriver,
//           moderateHighRiskDriver,
//           highRiskDriver,
//         } = rateTheDriver(customer);

//         // Update the database with the new rating
//         const updateQuery =
//           "UPDATE `claims-calculator`.selector_table SET rating = ? WHERE customerID = ?";
//         db.query(updateQuery, [rating, customer.customerID], (updateErr) => {
//           if (updateErr) {
//             console.error("Error updating data in database:", updateErr);
//           }
//         });

//         return {
//           ...customer,
//           rating,
//           lowRiskDriver,
//           lowModerateRiskDriver,
//           moderateRiskDriver,
//           moderateHighRiskDriver,
//           highRiskDriver,
//         }; // Add rating and risk levels to the customer object
//       });

//       res.json(customersWithRatings);
//     }
//   });
// });
