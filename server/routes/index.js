const express = require('express');
const router = express.Router();
const servicestatus = require('./serviceStatus');
const accounts = require('./accounts');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.use('/servicestatus', servicestatus);
router.use('/accounts', accounts);

module.exports = router;
