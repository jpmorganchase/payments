/* eslint-disable no-param-reassign */
// eslint-disable no-console

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const https = require('https');

const {
  createProxyMiddleware,
  responseInterceptor,
} = require('http-proxy-middleware');
const { gatherHttpsOptionsAsync } = require('./grabSecret');
const { generateJWTJose } = require('./digitalSignature');

const app = express();
app.use(bodyParser.json());

const env = process.env.NODE_ENV;

const gatherHttpsOptions = async () => {
  let httpsOpts;
  if (env === 'development') {
    // Required for local execution
    httpsOpts = {
      KEY: fs.readFileSync('./certs/jpmc.key', 'utf-8'),
      CERT: fs.readFileSync('./certs/jpmc.crt', 'utf-8'),
      DIGITAL: fs.readFileSync('certs/treasury-services/digital-signature/key.key', 'utf-8'),
    };
  } else {
    // Required for AWS Lambda to gather secrets
    httpsOpts = await gatherHttpsOptionsAsync();
  }
  return {
    key: httpsOpts.KEY && httpsOpts.KEY.replace(/\\n/g, '\n'),
    cert: httpsOpts.CERT && httpsOpts.CERT.replace(/\\n/g, '\n'),
    digital: httpsOpts.DIGITAL && httpsOpts.DIGITAL.replace(/\\n/g, '\n'),

  };
};

const handleProxyResponse = async (responseBuffer, proxyRes, req) => {
  const exchange = `[${req.method}] [${proxyRes.statusCode}] ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path}`;
  console.log(exchange);
  if (proxyRes.headers['content-type'] === 'application/json') {
    const data = JSON.parse(responseBuffer.toString('utf8'));
    return JSON.stringify(data);
  }
  return responseBuffer;
};

async function createProxyConfiguration(target, httpsOpts) {
  const options = {
    target,
    changeOrigin: true,
    agent: new https.Agent(httpsOpts),
    pathRewrite: {
      '^/api': '',
    },
  };
  return createProxyMiddleware(options);
}

async function createProxyConfigurationForDigital(target, httpsOpts, digitalSignature) {
  const options = {
    target,
    changeOrigin: true,
    logLevel: 'debug',
    selfHandleResponse: true,
    agent: new https.Agent(httpsOpts),
    pathRewrite: {
      '^/api/digitalSignature': '',
    },
    onProxyReq: async (proxyReq, req) => {
      if (req.body) {
        proxyReq.setHeader('Content-Type', 'text/xml');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(digitalSignature));
        proxyReq.write(digitalSignature);
      }
    },
    onProxyRes: responseInterceptor(handleProxyResponse),
    onError: (err) => {
      console.log(err);
    },
  };
  return createProxyMiddleware(options);
}

app.use('/jwt', generateJWTJose);

app.use('/api/digitalSignature/*', async (req, res, next) => {
  const httpsOpts = await gatherHttpsOptions();
  const digitalSignature = await generateJWTJose(req.body, httpsOpts.digital);
  const func = await createProxyConfigurationForDigital('https://apigatewaycat.jpmorgan.com', httpsOpts, digitalSignature);
  func(req, res, next);
});

app.use('/api/*', async (req, res, next) => {
  const httpsOpts = await gatherHttpsOptions();
  const func = await createProxyConfiguration('https://apigatewayqaf.jpmorgan.com', httpsOpts);
  func(req, res, next);
});

module.exports = app;
