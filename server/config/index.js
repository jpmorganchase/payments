require('dotenv').config();

module.exports = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT) || 5000,
  env: process.env.NODE_ENV || 'development',

  /**
   * API configs
   */
  api: {
    prefix: '/api',
    key: process.env.KEY && process.env.KEY.replace(/\\n/g, '\n'),
    cert: process.env.CERT && process.env.CERT.replace(/\\n/g, '\n'),
    errorString: 'Error hitting API',
  },
  cache: {
    serviceStatus: 'serviceStatus',
    balance: 'balances',
    transaction: 'transactions',
  },
};
