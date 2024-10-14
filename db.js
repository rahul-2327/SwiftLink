const mongoose = require("mongoose");
require("dotenv").config();

// Connection string (local or from environment)
// const URL = "mongodb://localhost:27017/shorturl";
const URL = process.env.DB_URL;

// Connect to MongoDB
mongoose.connect(URL, {
  ssl: false, // Set to true if you're using SSL in production
  tls: false, // Set to true if you need TLS
  // Uncomment if you need to use TLS with a certificate file
  // tlsCAFile: "/path/to/ca-certificate.pem",
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to Mongo server");
});

db.on("disconnected", () => {
  console.log("Disconnected from Mongo server");
});

db.on("error", (err) => {
  console.log("Error while connecting to Mongo server:", err);
});

module.exports = db;
