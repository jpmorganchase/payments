const config = require('../config');
const https = require('https');
const cache = require('../loaders/cache');

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
    });
};

exports.checkInCache = function (cacheKey, timePeriod) {
  const cachedValue = cache.getDataFromCache(cacheKey);
  if (
    cachedValue &&
    !checkTimestampDifference(cachedValue.timestamp, timePeriod)
  ) {
    return cachedValue;
  }
  return undefined;
};

const checkTimestampDifference = (cachedTimestamp, timePeriod) => {
  if (
    new Date(timePeriod).setHours(0, 0, 0, 0) !==
    new Date().setHours(0, 0, 0, 0)
  ) {
    return false;
  }
  return new Date() - cachedTimestamp > timePeriod;
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
