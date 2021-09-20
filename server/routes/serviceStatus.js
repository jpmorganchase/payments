const express = require('express');
const router = express.Router();
const serviceStatusService = require('../services/serviceStatusService');

router.get('/', async (request, response) => {
  const result = await serviceStatusService.getData();
  console.log(result);
  if (!result || result.message) {
    console.log(`Error when hitting API: ${result.message}`);
    return response
      .status(result.statusCode)
      .send(JSON.stringify(result.message));
  }
  return response.status(result.statusCode).send(JSON.stringify(result));
});

module.exports = router;
