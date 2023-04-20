require('dotenv').config();
const express = require('express');
const Paystack = require('@paystack/paystack-sdk');
const crypto = require('crypto');

const app = express();
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/initialize-transaction', async (req, res) => {
  let { email, amount } = req.body;

  try {
    let initializedTransaction = await paystack.transaction.initialize({
      email,
      amount,
    });

    if (initializedTransaction.status === true) {
      return res.status(200).json(initializedTransaction);
    }
    return res.status(400).json(initializedTransaction);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

app.post('/webhook', async (req, res) => {
  //validate event
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');
  if (hash !== req.headers['x-paystack-signature']) {
    return res.sendStatus(400);
  }
  res.sendStatus(200);
  const event = req.body;
  console.log(event);
  // process webhook
});

app.listen(5000, () => {
  console.log(`App running on http://localhost:5000`);
});
