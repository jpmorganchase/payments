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

function sendHttpsrequest(options) {
  return new Promise((resolve, reject) => {
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

function handleHttpsRequest(response, options, mockedDataPath) {
  return sendHttpsrequest(options)
    .then((data) => {
      const result = {
        data: data,
      };
      if (isEmptyObject(data)) {
        result.mocked = true;
        result.data = getJsonData(basePathToData, mockedDataPath);
      }
      return response.status(200).send(JSON.stringify(result));
    })
    .catch((err) => {
      if (err.message.includes(errorString)) {
        return response
          .status(err.statusCode)
          .send(JSON.stringify({ errorString }));
      }
    });
}

function isEmptyObject(value) {
  return (
    value && Object.keys(value).length === 0 && value.constructor === Object
  );
}

function processData(options, response, mockedDataPath) {
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    return handleHttpsRequest(response, options, mockedDataPath);
  } else {
    const result = {
      data: getJsonData(basePathToData, mockedDataPath),
      mocked: true,
    };
    return response.send(JSON.stringify(result));
  }
}
exports.getPacmanData = function (request, response) {
  const mockedDataPath = 'uf-pacman.json';
  const options = {
    hostname: 'apigatewayqaf.jpmorgan.com',
    path: '/tsapi/v1/outages',
    method: 'GET',
    cert: cert,
    key: key,
  };
  return processData(options, response, mockedDataPath);
};
