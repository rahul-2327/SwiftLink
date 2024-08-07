const mongoose = require("mongoose");

const URL = "mongodb://localhost:27017/short-url";

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
