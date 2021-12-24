const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("connected", () => console.log(`connected to db`));
db.on("error", () => console.log(`connected failed!`));

module.exports = db;
