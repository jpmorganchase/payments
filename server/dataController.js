require('dotenv').config();

const path = require('path');
const fs = require('fs');
const https = require('https');

const basePathToData = path.join(__dirname, 'mockJson');

const key = process.env.KEY && process.env.KEY.replace(/\\n/g, '\n');
const cert = process.env.CERT && process.env.CERT.replace(/\\n/g, '\n');

// const key = fs.readFileSync(path.join(__dirname, '../unicorns/private.key'));
//const cert = fs.readFileSync(path.join(__dirname, '../unicorns/unicorn.crt'));

const errorString = 'Error hitting API';
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
      cert: cert,
      key: key,
    };
    const req = https.request(options, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        var error = new Error(`${errorString}, statusCode= ${res.statusCode}`);
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

exports.getData = function (request, response) {
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    return httpsrequest()
      .then((data) => {
        return response.send(JSON.stringify(data));
      })
      .catch((err) => {
        if (err.message.includes(errorString)) {
          response.statusCode = err.statusCode;
          return response.send(JSON.stringify({ errorString }));
        }
      });
  } else {
    var data = getJsonData(basePathToData, 'mockedData.json');
    return response.send(data);
  }
};
