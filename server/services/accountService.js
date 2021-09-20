const config = require('../config');
const common = require('./common');

exports.getTransactionData = function (request, response) {
  const options = {
    hostname: 'apigatewayqaf.jpmorgan.com',
    path: '/tsapi/v2/transactions?accountIds=000000011116605&startDate=2021-02-22&endDate=2021-02-27',
    method: 'GET',
    cert: config.api.cert,
    key: config.api.key,
  };
  return common.handleHttpsRequest(response, options);
};

exports.getBalanceData = function (request, response) {
  const postData = JSON.stringify({
    startDate: '2021-02-22',
    endDate: '2021-02-27',
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
    timeout: 1000, // in ms
  };
  return common.handleHttpsRequest(response, options, postData);
};
