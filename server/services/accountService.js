const config = require('../config');
const common = require('./common');

exports.getTransactionData = async function () {
  if (config.api.cert && config.api.key) {
    // TODO do we want this in config?
    const options = {
      hostname: 'apigatewayqaf.jpmorgan.com',
      path: '/tsapi/v2/transactions?accountIds=000000011116605&endDate=2021-03-01',
      method: 'GET',
      cert: config.api.cert,
      key: config.api.key,
    };
    const response = await common.handleHttpsRequest(options);
    return response;
  }
  return common.noAuthenticationResponse();
};

exports.getBalanceData = async function (prior = false) {
  if (config.api.cert && config.api.key) {
    const postData = JSON.stringify({
      relativeDateType: prior ? 'PRIOR_DAY' : 'CURRENT_DAY',
      accountList: [
        {
          accountId: '000000011116605',
        },
      ],
    });
    const options = {
      hostname: 'apigatewayqaf.jpmorgan.com',
      path: '/accessapi/balance',
      method: 'POST',
      cert: config.api.cert,
      key: config.api.key,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
      },
    };
    const response = await common.handleHttpsRequest(options, postData);
    return response;
  }
  return common.noAuthenticationResponse();
};
