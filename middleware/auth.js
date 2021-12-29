const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.status(403).send("Invalid token!");
      }

      const user = await User.findOne({ _id: payload });
      req.user = { ...user._doc, password: undefined };
      next();
    });
  } else {
    res.status(401).send("Forbidden");
  }
};
