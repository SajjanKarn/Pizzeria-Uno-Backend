require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(`connected to database`))
  .catch((err) => console.log(err));

// middlewares
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("hello world");
});

// server configuration.
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`@ - http://localhost:${PORT}`);
});
