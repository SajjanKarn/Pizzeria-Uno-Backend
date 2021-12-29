const router = require("express").Router();

const Pizza = require("../models/Pizza");

router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find();

    return res.status(200).json(pizzas);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
