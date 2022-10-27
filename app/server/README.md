# Demo Wholesale Payments App - Unicorn Finance Lambda/API Gateway

Currently we are deploying the backend using Lambda with an API Gateway.
This isn't ideal for express apps but it is necessary for future integrations with APIs.

## Deployment (todo automate this)

1. Ensure app.js is not looking for local files
2. Run below commands from within this folder

```bash
yarn build
```

3. Log on to AWS lambda service
4. Upload new code
