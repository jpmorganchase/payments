const config = require('../config');
const https = require('https');

exports.handleHttpsRequest = function (response, options) {
  console.log(`Sending request to ${options.hostname}${options.path}`);
  return sendHttpsrequest(options)
    .then((data) => {
      const result = {
        data: data,
      };
      return response.status(200).send(JSON.stringify(result));
    })
    .catch((err) => {
      if (err && err.message && err.message.includes(config.api.errorString)) {
        return response
          .status(err.statusCode)
          .send(JSON.stringify(config.api.errorString));
      }
    });
};

function sendHttpsrequest(options) {
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
    req.on('error', (e) => {
      reject(e.message);
    });
    req.end();
  });
}
