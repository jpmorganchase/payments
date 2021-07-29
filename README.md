# Demo Wholesale Payments App

Our goal is to create re-usable sample apps that external developers can leverage
as reference.

## Project structure

The codebase is built with React and Tailwind css on the frontend and express on the backend. 

We have also implemented testing with Jest and Cypress. 

## Running Locally
You have the option of running locally with mocked data or hitting the actual APIs. 

### Mocked data
    yarn install
    yarn run client-dependencies
    yarn run dev

### Hitting JP Morgan APIs

This will require you to provide some SSL certificates. 
You will need to onboard to JP Morgan to access this information. Further details are available [here](http://developer.jpmorgan.com/).

Once you have the correct files ready you can upload them to your server (DO NOT COMMIT THESE FILES TO YOUR CODEBASE). 
As we are using codesandbox the information for these files are stored in secret keys. 

#### Using your SSL files

To change the code to use ssl files:
    1. Navigate to [dataController.js](./server/dataController.js)
    2. Uncomment these lines and change file path to your ssl file location:
        // const key = fs.readFileSync(path.join(__dirname, '../unicorns/private.key'));
        // const cert = fs.readFileSync(path.join(__dirname, '../unicorns/unicorn.crt'));
    3. Delete these lines:
        const key = process.env.KEY && process.env.KEY.replace(/\\n/g, '\n');
        const cert = process.env.CERT && process.env.CERT.replace(/\\n/g, '\n');

 ```python
print("Hello World!")
```

#### Running

    yarn install
    yarn run client-dependencies
    yarn run dev

Navigate to localhost:3000

## Running tests

    yarn run test


### Deprecation warnings

These are coming from react scripts package, with open issue:

https://github.com/facebook/create-react-app/issues/9431
