const fs = require('fs');
const jose = require('jose');
const { body } = require('./body');
const { gatherDigitalSignatureKeyAsync } = require('./grabSecret');
const header = {
  alg: 'RS256',
};
const env = process.env.NODE_ENV


const generateJWTJose = async (req, res) => {
  let digitalSignatureKey;
  if(env === 'development'){
  digitalSignatureKey = fs.readFileSync(
    'certs/treasury-services/digital-signature/key.key',
    'utf-8',
  );
  }else{
  const digitalSignature = await gatherDigitalSignatureKeyAsync();
  digitalSignatureKey = digitalSignature.digital.replace(/\\n/g, '\n');
  }

  const privateKey = await jose.importPKCS8(digitalSignatureKey, 'RSA-SHA256');

  const jwt = await new jose.SignJWT(body)
    .setProtectedHeader(header)
    .sign(privateKey);
  res.send(jwt);
};

module.exports = { generateJWTJose };
