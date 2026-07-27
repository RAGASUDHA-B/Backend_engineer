const dns = require("dns");
dns.setServers(["8.8.8.8"]);
require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });