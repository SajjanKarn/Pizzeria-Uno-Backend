require("dotenv").config({ path: "./config/config.env" });
require("./config/db"); // database

const express = require("express");

const Pizza = require("./models/Pizza");
const app = express();

// middlewares
app.use(express.json());

// routes

app.get("/", async (req, res) => {
  const pizzas = await Pizza.find();
  res.send(pizzas);
});

// server configuration.
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`@ - http://localhost:${PORT}`);
});
