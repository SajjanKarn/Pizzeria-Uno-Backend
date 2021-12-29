require("dotenv").config({ path: "./config/config.env" });
require("./config/db"); // database

const express = require("express");
const cors = require("cors");

const Pizza = require("./models/Pizza");
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/pizza", require("./routes/pizza"));

// server configuration.
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`@ - http://localhost:${PORT}`);
});
