const express = require("express");
const app = express();
const { ROUTES, ORIGINS_CORS } = require("./config/settings");

const cors = require("cors");

app.use(
  cors()
);

app.use(express.json());

for (let router of ROUTES) {
  app.use(router.path, require(`./resources/${router.resource}`));
}

module.exports = app;
