type AccountsType = string[];
const accounts: AccountsType = [
  '000000010975001',
  '000000011008182',
  '000000010975514',
  '000000010975001',
  '000000010900009',
];
interface AccountsConfigType {
  accountsConfig: {
    apiDetails: ApiDetails[];
    accountDetails: AccountsType;
  };
}

interface StatusConfigType {
  statusConfig: {
    apiDetails: ApiDetails[];
  }
}

interface ApiDetails {
  name: string;
  backendPath: string;
  cacheKey: string;
  path: string;
  refreshInterval: number;
  description: string;
}
interface ConfigDataType extends AccountsConfigType, StatusConfigType {
}

const config: ConfigDataType = {
  accountsConfig: {
    accountDetails: accounts,
    apiDetails: [
      {
        name: 'Balances',
        backendPath: '/api/accessapi/balance',
        path: 'https://apigatewayqaf.jpmorgan.com/accessapi/balance',
        description:
          'This API returns intraday balances for specific accounts. We use it to get the current day balance for a UAT account.',
        cacheKey: 'balances',
        refreshInterval: 43200000,
      },
      {
        name: 'Transactions',
        path: 'https://apigatewayqaf.jpmorgan.com/tsapi/v2/transactions?relativeDateType=CURRENT_DAY',
        description:
          'This API returns all the transactions for a specific account for a specific time period.',
        backendPath: `/api/tsapi/v2/transactions?relativeDateType=CURRENT_DAY&accountIds=${accounts.toString()}`,
        cacheKey: 'transactions',
        refreshInterval: 1800000,
      },
    ],
  },
  statusConfig: {
    apiDetails: [
      {
        name: 'Platform Availability Communication Manangement',
        backendPath: '/api/tsapi/v1/participants',
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
