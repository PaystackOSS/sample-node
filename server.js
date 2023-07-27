require('dotenv').config();
const express = require('express');
const Paystack = require('@paystack/paystack-sdk');
const crypto = require('crypto');


const app = express();
// const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// import up Firebase SDK...
const fbAdmin = require("firebase-admin");

// Download serviceAccountKey.json from Firebase Console.
var serviceAccount = require("../sample-node/serviceAccountKey.json");

// connect to your firebase project instance
var firebase = fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert(serviceAccount)
});

// Initialize a transaction on the API directly
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

// Receives Paystack webhook event and sends it to the mobile app.
app.post('/webhook', async (req, res) => {
  
  // validate event is coming from Paystack
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

    // TODO: add ip whitelisting. 
  if (hash !== req.headers['x-paystack-signature']) {
    console.log("Hash failed....")
    return res.sendStatus(400);
  }

  const reference = req.body.data.reference;
  console.log(reference);
  
  // Set a 3 second timeout then send transaction reference to the app.
  setTimeout(() => sendNotification(reference), 3000)
  res.sendStatus(200);
});

// Sends a notification to our App with the transaction reference.
function sendNotification(reference) {
  
// This registration token comes from the device of our Android App (checkout: logRegToken())
// https://firebase.google.com/docs/cloud-messaging/send-message
const registrationToken = process.env.FCM_TOKEN;

const message = {
  notification: {
    title: 'Your Burger is coming',
    body: `Your order reference is ${reference}`
  },
  token: registrationToken
};

// Send a message to the device
firebase.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
}

app.listen(3000, () => {
  console.log(`App running on http://localhost:3000`);
});
