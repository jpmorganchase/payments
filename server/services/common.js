const config = require('../config');
const https = require('https');

exports.noAuthenticationResponse = function () {
  return {
    message: 'No API Certs or Keys defined, not hitting APIs',
    statusCode: 401,
  };
};

exports.handleHttpsRequest = function (options, data = undefined) {
  console.log(`Sending request to ${options.hostname}${options.path}`);
  return sendHttpsrequest(options, data)
    .then((data) => {
      return { statusCode: 200, data: data };
    })
    .catch((err) => {
      if (err && err.message && err.message.includes(config.api.errorString)) {
        return {
          statusCode: err.statusCode,
          message: config.api.errorString,
        };
      }
      return {
        statusCode: err.statusCode,
        message: err.message,
      };
    });
};

function sendHttpsrequest(options, data = undefined) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        var error = new Error(
          `${config.errorString}, statusCode= ${res.statusCode}`,
        );
        error.statusCode = res.statusCode;
        return reject(error);
      }
      var body = [];
      res.on('data', function (chunk) {
        body.push(chunk);
      });
      res.on('end', function () {
        try {
          body = JSON.parse(Buffer.concat(body).toString());
        } catch (e) {
          reject(e);
        }
        resolve(body);
      });
    });
    if (data) {
      req.write(data);
    }
    req.on('error', (e) => {
      reject(e.message);
    });
    req.end();
  });
}
