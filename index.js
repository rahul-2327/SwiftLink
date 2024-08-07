const express = require("express");
const db = require("./db");
const app = express();
const URL = require("./models/url");
const urlRoute = require("./routes/urlRouter");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const PORT = 8001;

app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  try {
    const shortID = req.params.shortId;
    if (!shortID) {
      console.log("bad request");
      return res
        .status(404)
        .json({ message: "error 404 bad request invalid url" });
    }
    const response = await URL.findOneAndUpdate(
      {
        shortId: shortID,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    console.log("redirected url fetched ", response);
    // res.status(200).json(response.redirectURL);
    res.redirect(response.redirectURL);
  } catch (err) {
    console.log("server error");
    res.status(500).json({ message: " internal server error" });
  }
});

// app.use("/r")

app.listen(PORT, () => console.log("server started on PORT: ", PORT));
