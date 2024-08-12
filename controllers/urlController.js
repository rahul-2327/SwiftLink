// const { nanoid } = require("nanoid");
const shortid = require("shortid");
const URL = require("./../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) {
      console.log("bad request");
      return res.status(400).json({ message: "error 400 bad request invalid url" });
    }
    // const newShortID = shortid(8);
    const newShortID = shortid.generate();
    await URL.create({
      shortId: newShortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.status(200).json({ id: newShortID });
  } catch (err) {
    console.log("server error");
    res.status(500).json({ message: " internal server error" });
  }
}

module.exports = handleGenerateNewShortURL;
