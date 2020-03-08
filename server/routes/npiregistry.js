const express = require("express");

const npiregistryRouter = express.Router();

npiregistryRouter.route("/").get((req, res) => {
  fetch(
    "https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=10&pretty=true&state=NV&enumeration_type=NPI-1&last_name=villaluz"
  )
    .then(resp => resp.json)
    .then(resp => res.send(resp))
    .catch(err => console.log(err));
});

module.exports = npiregistryRouter;
