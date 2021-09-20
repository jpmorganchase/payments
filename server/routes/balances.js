const express = require('express');
const router = express.Router();
const dataController = require('../dataController');

router.get('/', dataController.getBalanceData);

module.exports = router;
