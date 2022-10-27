// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const jose = require('jose');
const { body } = require('./body');
const { gatherDigitalSignatureKeyAsync } = require('./grabSecret');

const header = {
  alg: 'RS256',
};
const env = process.env.NODE_ENV;

const gatherDigitalSignatureKeyDetails = async () => {
  let digitalSignatureKey;
  if (env === 'production') {
    const digitalSignature = await gatherDigitalSignatureKeyAsync();
    digitalSignatureKey = digitalSignature.digital.replace(/\\n/g, '\n');
  } else {
    digitalSignatureKey = fs.readFileSync(
      'certs/treasury-services/digital-signature/key.key',
      'utf-8',
    );
  }
  return digitalSignatureKey;
};
const generateJWTJose = async (req, res) => {
  const digitalSignatureKey = gatherDigitalSignatureKeyDetails();
  const privateKey = await jose.importPKCS8(digitalSignatureKey, 'RSA-SHA256');

  const jwt = await new jose.SignJWT(body)
    .setProtectedHeader(header)
    .sign(privateKey);
  res.send(jwt);
};

module.exports = { generateJWTJose };
