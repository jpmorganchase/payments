const NodeCache = require('node-cache');
const serviceStatusService = require('../services/serviceStatusService');
const config = require('../config');
const myCache = new NodeCache();

exports.loadDataToCache = async function () {
  await loadServiceStatusData();
};

exports.getDataFromCache = function (key) {
  return myCache.get(key);
};

const loadServiceStatusData = async () => {
  console.log('Populate service status cache');
  const serviceStatusData = await serviceStatusService.getData();
  serviceStatusData.timestamp = new Date();
  myCache.set(config.cache.serviceStatus, serviceStatusData);
};
