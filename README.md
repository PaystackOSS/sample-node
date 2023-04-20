# Accept a Payment with Redirect and Node.js

This repository includes a sample backend server for accepting a payment using Paystack Redirect and the official Paystack Node.js SDK. Follow the accompanying tutorial to learn how to use the server.

**Note:** No accompanying frontend is included in this sample, as the tutorial uses Postman to pass data to the server. In a future tutorial, we'll build a complete integration by adding a frontend to interact with this server.

## Get Started

1. Clone this repo:

```
git clone https://github.com/PaystackOSS/sample-redirect.git
```

2. Navigate to the root directory and install dependencies

```
cd sample-redirect
npm install
```

## Usage

1. Rename the `.env.example` file to `.env` and add your Paystack secret key:

```
PAYSTACK_SECRET_KEY=sk_domain_xxxxxx
```

2. Start the application

```
npm start
```

3. The server should now be running on http://localhost:5000. View the accompanying tutorial to see how you can pass data to the server and initialize a transaction.

## Contributing

If you notice any issues with this app, please [open an issue](https://github.com/PaystackOSS/sample-redirect/issues/new). PRs are also more than welcome, so feel free to [submit a PR](https://github.com/PaystackOSS/sample-redirect/compare) to fix an issue, or add a new feature!

## License

This repository is made available under the MIT license. Read [LICENSE.md](https://github.com/PaystackOSS/sample-redirect/blob/master/LICENSE.md) for more information.
