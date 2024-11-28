require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.HOSTNAME || "localhost",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "locprobk22",
  database: process.env.DATABASE_NAME || "hcmut_ssps",
});
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database with id " + connection.threadId);
});
module.exports = connection;
