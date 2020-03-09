const express = require("express");
const fetch = require("node-fetch");
const cors = require("./cors");

const npiregistryRouter = express.Router();

npiregistryRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res) => {
    fetch(
      "https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=10&pretty=true&state=NV&enumeration_type=NPI-1&last_name=villaluz"
    )
      .then(resp => resp.json())
      .then(resp => res.send(resp))
      .catch(err => console.log(err));
  });

module.exports = npiregistryRouter;
