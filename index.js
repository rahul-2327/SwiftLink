const express = require("express");
const db = require("./db");
const app = express();
const URL = require("./models/url");
const urlRoute = require("./routes/urlRouter");
const bodyParser = require("body-parser");
const path = require("path");
app.use(express.json());

app.use(bodyParser.json());
const PORT = process.env.PORT || 8001;

app.use("/url", urlRoute);
// for redirecting
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

// // ---------------------------deployment---------------------
// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.koin(__dirname1, "./build")));
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running Successfully");
//   });
// }
// // --------------------------deployment------------------

app.listen(PORT, () => console.log("server started on PORT: ", PORT));
