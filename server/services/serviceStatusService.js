const config = require('../config');
const common = require('./common');

exports.getData = async function () {
  if (config.api.cert && config.api.key) {
    const options = {
      hostname: 'apigatewayqaf.jpmorgan.com',
      path: '/tsapi/v1/outages',
      method: 'GET',
      cert: config.api.cert,
      key: config.api.key,
    };
    const response = await common.handleHttpsRequest(options);
    return response;
  }
  return common.noAuthenticationResponse();
};
