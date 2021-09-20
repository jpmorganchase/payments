const express = require('express');
const router = express.Router();
const accountService = require('../services/accountService');

router.get('/balances', accountService.getBalanceData);
router.get('/transactions', accountService.getTransactionData);

module.exports = router;
