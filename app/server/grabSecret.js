// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/

const SECRET_NAME = process.env.SECRET_NAME;
const DIGITAL_SIGNATURE_NAME = process.env.DIGITAL_SIGNATURE_NAME;

// Load the AWS SDK
var AWS = require('aws-sdk'),
  region = 'us-east-1';

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
  region: region,
});

async function gatherHttpsOptionsAsync() {
  const result = await client
    .getSecretValue({ SecretId: SECRET_NAME })
    .promise();
  return JSON.parse(result.SecretString);
}

async function gatherDigitalSignatureKeyAsync() {
  const result = await client
    .getSecretValue({ SecretId: DIGITAL_SIGNATURE_NAME })
    .promise();
  return JSON.parse(result.SecretString);
}

module.exports = { gatherHttpsOptionsAsync, gatherDigitalSignatureKeyAsync };