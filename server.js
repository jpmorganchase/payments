const https = require('https');

require('dotenv').config();
const path = require('path');
const fetch = require('node-fetch');
const express = require('express');
const privateKey = process.env.KEY_private;
const certificate = process.env.CERT;
const port = process.env.port || 4000;

const httpsOptions = {
  key: privateKey && privateKey.replace(/\\n/g, '\n'),
  cert: certificate && certificate.replace(/\\n/g, '\n'),
};

const app = express();

// Transforms the raw string of req.body into json
app.use(express.json());
// Load API routes

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
  console.log('here');
  handleRequest(req, res);
});

app.use((req, res, next) => {
  console.log('hereesee');

  const err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

app.use((err, req, res) => {
  console.log('hereeee');
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
    },
  });
});

const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(port, () => console.log(`Listening on port ${port}`));

const sslConfiguredAgent = new https.Agent(httpsOptions);

const getAPIEndpoint = (path) => {
  switch (path) {
    case 'status':
      return 'https://apigatewayqaf.jpmorgan.com/tsapi/v1/participants?status=OFFLINE';
    case 'balances':
      return 'https://apigatewayqaf.jpmorgan.com/accessapi/balance';
    case 'balancesprior':
      return 'https://apigatewayqaf.jpmorgan.com/accessapi/balance';
    case 'transactions':
      return 'https://apigatewayqaf.jpmorgan.com/tsapi/v2/transactions?relativeDateType=PRIOR_DAY';
  }
};

const generateError = (response, responseBody) => {
  return response
    .status(500)
    .json(
      responseBody ? responseBody : { error: 'Issue collecting data from API' },
    );
};

const postRequest = async (apiEndpoint, prior = false) => {
  return await fetch(apiEndpoint, {
    agent: sslConfiguredAgent,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      relativeDateType: prior ? 'PRIOR_DAY' : 'CURRENT_DAY',
      accountList: [
        {
          accountId: '000000010013324',
        },
      ],
    }),
  });
};

const getRequest = async (apiEndpoint) => {
  console.log(apiEndpoint);
  if (apiEndpoint) {
    return await fetch(apiEndpoint, {
      agent: sslConfiguredAgent,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
  }
};

const handleRequest = async (request, response) => {
  const { path } = request.query;
  const apiEndpoint = getAPIEndpoint(path);
  try {
    let responseValue;
    if (path === 'balances') {
      responseValue = await postRequest(apiEndpoint);
    } else if (path === 'balancesprior') {
      responseValue = await postRequest(apiEndpoint, true);
    } else {
      responseValue = await getRequest(apiEndpoint);
    }
    const responseBody = await responseValue.json();
    if (responseBody.errors || responseBody.fault) {
      console.log(`Error response from API: ${JSON.stringify(responseBody)}`);
      return generateError(response, responseBody);
    }
    return response.status(200).json(responseBody);
  } catch (error) {
    console.log(error);
    return generateError(response);
  }
};
