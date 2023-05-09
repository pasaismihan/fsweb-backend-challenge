const express = require("express");
const server = express();
require("dotenv").config();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

module.exports = server;
