const express = require('express');
const router = express.Router();
const serviceStatusService = require('../services/serviceStatusService');

router.get('/', serviceStatusService.getData);

module.exports = router;
