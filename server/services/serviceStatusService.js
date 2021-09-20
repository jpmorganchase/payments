const config = require('../config');
const common = require('./common');
const cache = require('../loaders/cache');

exports.getData = function () {
  const cachedValue = cache.getDataFromCache(config.cache.serviceStatus);
  if (cachedValue && !checkTimestampDifference(cachedValue.timestamp)) {
    return cachedValue;
  }
  const options = {
    hostname: 'apigatewayqaf.jpmorgan.com',
    path: '/tsapi/v1/outages',
    method: 'GET',
    cert: config.api.cert,
    key: config.api.key,
  };
  return common.handleHttpsRequest(options);
};

const checkTimestampDifference = (cachedTimestamp) => {
  const oneHour = 60 * 60;
  return new Date() - cachedTimestamp > oneHour;
};
