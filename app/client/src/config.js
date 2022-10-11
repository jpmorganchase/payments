const accounts = ['000000010975001', '000000011008182'];
const config = {
  accountsConfig: {
    accountDetails: accounts,
    apiDetails: [
      {
        name: 'Balances',
        backendPath: `/api/accessapi/balance`,
        path: 'https://apigatewayqaf.jpmorgan.com/accessapi/balance',
        description:
          'This API returns intraday balances for specific accounts. We use it to get the current day balance for a UAT account.',
        cacheKey: 'balances',
        refreshInterval: 43200000,
        get body() {
          return {
            accountList: accounts.map((account) => {
              return { accountId: account };
            }),
          };
        },
      },
      {
        name: 'Transactions',
        path: 'https://apigatewayqaf.jpmorgan.com/tsapi/v2/transactions?relativeDateType=PRIOR_DAY',
        description:
          'This API returns all the transactions for a specific account for a specific time period.',
        backendPath: `/api/tsapi/v2/transactions?relativeDateType=PRIOR_DAY`,
        cacheKey: 'transactions',
        refreshInterval: 1800000,
      },
    ],
  },
  statusConfig: {
    apiDetails: [
      {
        name: 'Platform Availability Communication Manangement',
        backendPath: `/api/tsapi/v1/participants`,
        cacheKey: 'serviceStatus',
        path: 'https://apigatewayqaf.jpmorgan.com/tsapi/v1/participants',
        refreshInterval: 1800000,
        description:
          'This API returns a list of current outages within JP Morgan external APIs. If no outages are returned a message is displayed for the user.',
      },
    ],
  },
};
module.exports = { config };
