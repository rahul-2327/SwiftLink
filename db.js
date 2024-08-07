const mongoose = require("mongoose");
require("dotenv").config();
// const URL = "mongodb://localhost:27017/short-url";
const URL = process.env.DB_URL;

mongoose.connect(URL, {
  useNewURLParser: true,
  useUnifiedTopology: true,
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
