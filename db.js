const mongoose = require("mongoose");
require("dotenv").config();
// const URL = "mongodb://localhost:27017/shorturl";

const URL = process.env.DB_URL;
mongoose.connect(URL, {
  useNewUrlParser: true, // Corrected 'useNewURLParser' to 'useNewUrlParser'
  useUnifiedTopology: true,
  ssl: true,
  tls: true,
  tlsCAFile: "/path/to/ca-certificate.pem",
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to Mongo server");
});
db.on("disconnected", () => {
  console.log("disconnected to Mongo server");
});
db.on("error", (err) => {
  console.log("error while connecting to Mongo server ", err);
});

module.exports = db;
