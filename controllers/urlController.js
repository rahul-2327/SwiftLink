const { nanoid } = require("nanoid");
const URL = require("./../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    const URL = req.params.redirectURL;
  } catch (err) {
    console.log("server error");
    res.status(500).json({ message: "server error" });
  }
}
