const router = require("express").Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // missing field.
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please enter all the required fields." });
  }

  // name character limit valdiation.
  if (name.length > 15) {
    return res
      .status(400)
      .json({ error: "Name must be less than 15 characters." });
  }
  // email validation.
  const emailReg =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!emailReg.test(email)) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }

  // password length.
  if (password.length < 5) {
    return res
      .status(400)
      .json({ error: "Password must be atleast 6 charactes long." });
  }

  try {
    const doesUserAlreadyExist = await User.findOne({ email });
    if (doesUserAlreadyExist)
      return res.status(400).json({
        error: "A user with that email already exits. Please try other!",
      });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });

    const result = await newUser.save();
    result.password = undefined;

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ error: "please enter all the requierd fields." });

  try {
    const doesUserExist = await User.findOne({ email });
    if (!doesUserExist)
      return res.status(400).json({ error: "Invalid email or password." });

    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExist.password
    );
    if (!doesPasswordMatch)
      return res.status(400).json({ error: "Invalid email or password." });

    const token = jwt.sign({ _id: doesUserExist._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res
      .status(200)
      .json({ token, ...doesUserExist._doc, password: undefined });
  } catch (err) {}
});

router.get("/me", auth, async (req, res) => {
  return res.status(200).json({ ...req.user });
});

module.exports = router;
