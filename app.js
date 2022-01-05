require("dotenv").config({ path: "./config/config.env" });
require("./config/db"); // database

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const Pizza = require("./models/Pizza");
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// routes
app.use("/api/pizza", require("./routes/pizza"));
app.use("/api/user", require("./routes/auth"));
app.use("/api/order", require("./routes/order"));

// server configuration.
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`@ - http://localhost:${PORT}`);
});
