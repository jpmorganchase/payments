const NodeCache = require('node-cache');
const serviceStatusService = require('../services/serviceStatusService');
const accountService = require('../services/accountService');
const config = require('../config');
const myCache = new NodeCache();

exports.loadAllDataToCache = async function () {
  await loadServiceStatusData();
  await loadBalanceData();
  await loadPreviousBalanceData();
  await loadTransactionsData();
};

exports.loadDataToCache = function (key, data) {
  if (validResponse(data, key)) {
    data.timestamp = new Date();
    myCache.set(key, data);
  }
};

exports.getDataFromCache = function (key) {
  return myCache.get(key);
};

const validResponse = (response, cacheKey) => {
  if (!response || !response.statusCode || response.statusCode !== 200) {
    console.log(`Cache load failed for ${cacheKey}`);
    return false;
  }
  return true;
};

const loadServiceStatusData = async () => {
  console.log('Populating service status cache....');
  const serviceStatusData = await serviceStatusService.getData();
  this.loadDataToCache(config.cache.serviceStatus, serviceStatusData);
};

const loadBalanceData = async () => {
  console.log('Populating balance cache.....');
  const balanceData = await accountService.getBalanceData(config.cache.balance);
  this.loadDataToCache(config.cache.balance, balanceData);
};
const loadPreviousBalanceData = async () => {
  console.log('Populating previous day balance cache.....');
  const balanceData = await accountService.getBalanceData(
    config.cache.previousBalance,
    true,
  );
  this.loadDataToCache(config.cache.previousBalance, balanceData);
};
const loadTransactionsData = async () => {
  console.log('Populating transactions cache....');
  const transactionData = await accountService.getTransactionData();
  this.loadDataToCache(config.cache.transaction, transactionData);
};
