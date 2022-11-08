const jose = require('jose');

const header = {
  alg: 'RS256',
};

const generateJWTJose = async (body, key) => {
  const privateKey = await jose.importPKCS8(key, 'RSA-SHA256');
  const signature = await new jose.SignJWT(body)
    .setProtectedHeader(header)
    .sign(privateKey);
  return signature;
};

module.exports = { generateJWTJose };
