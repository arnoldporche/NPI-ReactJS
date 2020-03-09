const express = require("express");
const fetch = require("node-fetch");
const cors = require("./cors");

const npiregistryRouter = express.Router();

npiregistryRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res) => {
    var f = [];

    if (req.query.enumeration_type) {
      f.push('enumeration_type=' + req.query.enumeration_type);
    }
    
    if (req.query.last_name) {
      f.push('last_name=' + req.query.last_name + "*");
    }

    if (req.query.first_name) {
      f.push('first_name=' + req.query.first_name + "*");
    }

    if (req.query.organization_name) {
      f.push('organization_name=' + req.query.organization_name + "*");
    }

    if (req.query.number) {
      f.push('number=' + req.query.number);
    }

    if (req.query.usState) {
      f.push('state=' + req.query.usState);
    }

    var fields = f.join('&');

    fetch(
      "https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=10&pretty=true&" + fields
    )
      .then(resp => resp.json())
      .then(resp => res.send(resp))
      .catch(err => console.log(err));
  });

module.exports = npiregistryRouter;
