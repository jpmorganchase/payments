const express = require('express');
const path = require('path');
const dataController = require('./dataController');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});
app.get('/api/gatherServiceStatus', dataController.getServiceStatusData);
app.get('/api/gatherTransactions', dataController.getTransactionData);
app.get('/api/gatherBalance', dataController.getBalanceData);

module.exports = app;
