let envPath;

if (process.env.NODE_ENV == "test") envPath = ".env.test";
else if (process.env.NODE_ENV == "production") envPath = ".env";
else envPath = ".env.dev";

require("dotenv").config({
  path: envPath,
});

/////////////////////////////////////

const express = require("express");
const cors = require("cors");
const path = require("path");
const { errors } = require("celebrate");
const http = require("http");

require("./database/sequelize/connection");

const pagarMeperiodicCheck = require("./services/pagarMe/periodicCheck");
const { socketConnection } = require("./websocket/socketConnection");
const routes = require("./routes");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: process.env.CORS_ORIGIN_URL }));
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

socketConnection(server);
app.use(routes);

app.use(errors());

pagarMeperiodicCheck();

module.exports = server;
