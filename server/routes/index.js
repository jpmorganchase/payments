const express = require('express');
const router = express.Router();
const servicestatus = require('./serviceStatusRoutes');
const accounts = require('./accountsRoutes');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.use('/servicestatus', servicestatus);
router.use('/accounts', accounts);

module.exports = router;
