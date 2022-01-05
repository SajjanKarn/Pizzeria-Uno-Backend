const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/placeorder", async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  if (!token || !subtotal || !currentUser || !cartItems) {
    return res
      .status(400)
      .json({ error: "Please enter all the required fields!" });
  }

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: subtotal * 100,
        currency: "NPR",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      return res.status(200).json({ message: "Payment Done!" });
    }
  } catch (err) {
    return res.status(500).send("Something went wrong...");
    console.log(err);
  }
});

module.exports = router;
