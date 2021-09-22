const config = require('../config');
const common = require('./common');
const cache = require('../loaders/cache');

exports.getData = function () {
  const oneHour = 60 * 60 * 1000;
  const cachedValue = common.checkInCache(config.cache.serviceStatus, oneHour);
  if (cachedValue) {
    return cachedValue;
  }
  const options = {
    hostname: 'apigatewayqaf.jpmorgan.com',
    path: '/tsapi/v1/outages',
    method: 'GET',
    cert: config.api.cert,
    key: config.api.key,
  };
  const response = common.handleHttpsRequest(options);
  cache.loadDataToCache(config.cache.serviceStatus, response);
  return response;
};
