const config = require('../config');
const common = require('./common');

exports.getData = function (request, response) {
  const options = {
    hostname: 'apigatewayqaf.jpmorgan.com',
    path: '/tsapi/v1/outages',
    method: 'GET',
    cert: config.api.cert,
    key: config.api.key,
  };
  return common.handleHttpsRequest(response, options);
};
