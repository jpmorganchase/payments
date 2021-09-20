const express = require('express');
const router = express.Router();
const servicestatus = require('./serviceStatus');
const transactions = require('./transactions');
const balances = require('./balances');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.use('/servicestatus', servicestatus);
router.use('/transactions', transactions);
router.use('/balances', balances);

module.exports = router;
