const fs = require('fs');
const jose = require('jose');
const { body } = require('./body');
const { gatherDigitalSignatureKeyAsync } = require('./grabSecret');
const header = {
  alg: 'RS256',
};

const generateJWTJose = async (req, res) => {
  //Uncomment for local usage
  // const digitalSignatureKey = fs.readFileSync(
  //   'certs/treasury-services/digital-signature/key.key',
  //   'utf-8',
  // );

  // Uncomment for lambda usage
  const digitalSignature = await gatherDigitalSignatureKeyAsync();
  const digitalSignatureKey = digitalSignature.digital.replace(/\\n/g, '\n');

  const privateKey = await jose.importPKCS8(digitalSignatureKey, 'RSA-SHA256');

  const jwt = await new jose.SignJWT(body)
    .setProtectedHeader(header)
    .sign(privateKey);
  res.send(jwt);
};

module.exports = { generateJWTJose };
