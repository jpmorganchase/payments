const path = require('path');
const fs = require('fs');
const https = require('https');

const basePathToData = path.join(__dirname, 'mockJson');

const getJsonData = function (basePathToData, filename) {
  var filename = path.join(basePathToData, filename);
  return JSON.parse(fs.readFileSync(filename, 'utf-8'));
};

function httpsrequest() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'apigatewayqaf.jpmorgan.com',
      path: '/tsapi/v1/outages',
      method: 'GET',
      cert: fs.readFileSync(path.join(__dirname, '../unicorns/unicorn.crt')),
      key: fs.readFileSync(path.join(__dirname, '../unicorns/private.key')),
    };
    const req = https.request(options, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error('statusCode=' + res.statusCode));
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

exports.getData = function (request, response) {
  // Uncomment this for local dev
  // var data = getJsonData(basePathToData, 'mockedData.json');
  // return response.send(data);

  // Comment this for local dev
  return httpsrequest().then((data) => {
    return response.send(JSON.stringify(data));
  });
};
