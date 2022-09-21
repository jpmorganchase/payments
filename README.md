# Demo Wholesale Payments App - Unicorn Finance

We have created Unicorn Finance as a sample application showcasing the
capabilities of our JP Morgan core external APIs. We hit a number of JP Morgan
APIs in the UAT environment via ssl authentication.

See our project running on AWS Amplify
[here](https://www.unicorn-finance-dev.com/)

![Screenshot of Unicorn Finance](unicorn-finance-account.png 'Screenshot of Unicorn Finance')

## What APIs are you hitting?

1. Service Status Page: We hit the Platform Availability Communication
   Management API on this page. This returns a list of current outages within JP
   Morgan external APIs. If no outages are returned a message is displayed for
   the user.
2. Accounts Page: We hit two APIs on this page:
   - Balances: This API returns intraday balances for specific accounts. We use
     it to get the current day balance for a UAT account
   - Transactions: This API returns all the transactions for a specific account
     for a specific time period.

## What's included in this repo?

The code is written with React and Tailwind CSS. 
This code takes the data from the server and displays it in a user friendly manner.

## Getting started

Initially you will run the code hitting mocked data. 
This is because you need extra authentication information for hitting our actual APIs which is explained below.

```sh
cd app/client
yarn install
yarn start
```
Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>

If you see an error like this:
```
Proxy error: Could not proxy request /api/tsapi/v1/participants from localhost:3000 to http://localhost:8081.
See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNREFUSED).
```

You can ignore it as this is because our server is not running. (See [Hitting JP Morgan APIs locally section](#hitting-jp-morgan-apis-locally))

### Hitting JP Morgan APIs

This will require you to provide some SSL certificates. 
You will need to onboard to JP Morgan to access this information. Further details are available[here](http://developer.jpmorgan.com/).

Once you have the correct files ready you can upload them to your server (DO NOT COMMIT THESE FILES TO YOUR CODEBASE).

#### Hitting JP Morgan APIs locally

1. Store your certs in a folder that is included in .gitignore (eg. certs)
2. Open server/app.js and uncomment below lines
```js
  // const httpsOpts = {
  //   KEY: fs.readFileSync('../certs/jpmc.key', 'utf-8'),
  //   CERT: fs.readFileSync('../certs/jpmc.crt', 'utf-8'),
  // };
```
3. Make sure paths on these lines match your folder
3. Then run:

```sh
cd app/server
yarn install
nodemon app.local.js
```

## Testing

We are using cypress to test our screens. 
```sh
cd app/client
npx cypress open
```

## Contribution to our project

We welcome any contributions you have. Please create a PR and we will review it.
