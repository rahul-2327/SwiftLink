// const { nanoid } = require("nanoid");
const shortid = require("shortid");
const URL = require("./../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) {
      console.log("bad request");
      return res
        .status(404)
        .json({ message: "error 404 bad request invalid url" });
    }
    const shortID = shortid(8);
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.json({ id: shortID });
  } catch (err) {
    console.log("server error");
    res.status(500).json({ message: " internal server error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
};
