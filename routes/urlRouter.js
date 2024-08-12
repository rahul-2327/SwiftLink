const express = require("express");
const router = express.Router();

const handleGenerateNewShortURL = require("./../controllers/urlController");
const { model } = require("mongoose");

// const url = require("./../models/url")

router.post("/", handleGenerateNewShortURL);

module.exports = router;
