const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    variants: [],
    prices: [],
    category: {
      type: String,
      required: [true, "Category is required."],
    },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
  },
  { timestamps: true }
);

const Pizza = new mongoose.model("Pizzas", PizzaSchema);

module.exports = Pizza;
