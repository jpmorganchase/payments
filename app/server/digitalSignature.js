const fs = require('fs');
const jose = require('jose');
const { body } = require('./body');

const header = {
  alg: 'RS256',
};

const generateJWTJose = async (req, res) => {
  //Uncomment for local usage
  // const digitalSignatureKey = fs.readFileSync(
  //   'certs/treasury-services/digital-signature/key.key',
  //   'utf-8',
  // );
  const digitalSignatureKey = await gatherDigitalSignatureKeyAsync();

  const privateKey = await jose.importPKCS8(digitalSignatureKey, 'RSA-SHA256');

  const jwt = await new jose.SignJWT(body)
    .setProtectedHeader(header)
    .sign(privateKey);
  res.send(jwt);
};

module.exports = { generateJWTJose };
