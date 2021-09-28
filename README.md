# Demo Wholesale Payments App - Unicorn Finance

Our goal is to create re-usable sample apps that external developers can leverage
as reference for JP Morgan APIs. We have created Unicorn Finance as a sample application showcasing the capabilities of our core APIs. 

See our project running on codesandbox [here](https://codesandbox.io/s/unicornfinance-msbct)

![Screenshot of Unicorn Finance](unicorn-finance.png "Screenshot of Unicorn Finance")

## Project structure

We have split the codebase into client and server. 
The client is built with React and Tailwind CSS. The backend is Nodejs with Express js. 


## Running Locally

You have the option of running locally with mocked data or hitting the actual APIs. 

### Using our mocked data:
    
    yarn start
    Navigate to localhost:3000

### Hitting JP Morgan APIs:

This will require you to provide some SSL certificates. 
You will need to onboard to JP Morgan to access this information. Further details are available [here](http://developer.jpmorgan.com/).

Once you have the correct files ready you can upload them to your server (DO NOT COMMIT THESE FILES TO YOUR CODEBASE). 
As we are using codesandbox the information for these files are stored in secret keys. 

#### Using your SSL files

To change the code to use ssl files:

    1. Navigate to [index.js](./server/config/index.js)

    2. Change lines 15 and 16 to resemble:
    
```javascript
// const key = fs.readFileSync(path.join(__dirname, '../unicorns/private.key'));
// const cert = fs.readFileSync(path.join(__dirname, '../unicorns/unicorn.crt'));
```
    3. yarn start
    4. Navigate to localhost: 3000

#### Using your env variables

To change the code to use ssl files:

    1. Create a .env file in your root directory
    2. Add two variables 'KEY' and 'CERT' with your ssl details. E.g.

```txt
KEY="MYPRIVATEKEYDETAILS"
CERT="MYCERTDETAILS"
```
    3. yarn start
    4. Navigate to localhost: 3000


## Contribution to our project

We welcome any contributions you have. Please create a PR and we will review it.