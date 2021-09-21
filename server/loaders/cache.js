const NodeCache = require('node-cache');
const serviceStatusService = require('../services/serviceStatusService');
const accountService = require('../services/accountService');
const config = require('../config');
const myCache = new NodeCache();

exports.loadAllDataToCache = async function () {
  await loadServiceStatusData();
  await loadBalanceData();
  await loadTransactionsData();
};

exports.loadDataToCache = function (key, data) {
  myCache.set(key, data);
};

exports.getDataFromCache = function (key) {
  return myCache.get(key);
};

const loadServiceStatusData = async () => {
  console.log('Populating service status cache....');
  const serviceStatusData = await serviceStatusService.getData();
  serviceStatusData.timestamp = new Date();
  myCache.set(config.cache.serviceStatus, serviceStatusData);
};

const loadBalanceData = async () => {
  console.log('Populating balance cache.....');
  const balanceData = await accountService.getBalanceData();
  balanceData.timestamp = new Date();
  myCache.set(config.cache.balance, balanceData);
};

const loadTransactionsData = async () => {
  console.log('Populating transactions cache....');
  const transactionData = await accountService.getTransactionData();
  transactionData.timestamp = new Date();
  myCache.set(config.cache.transaction, transactionData);
};
