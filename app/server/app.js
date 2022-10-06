const express = require('express');
const fs = require('fs');
const { gatherHttpsOptionsAsync } = require('./grabSecret');
const { generateJWTJose } = require('./digitalSignature');
const https = require('https');

const {
  createProxyMiddleware,
  responseInterceptor,
} = require('http-proxy-middleware');
const app = express();

async function createProxyConfiguration(req, res) {
  // Required for AWS Lambda to gather secrets
  //const httpsOpts = await gatherHttpsOptionsAsync();

  // Required for local execution
  const httpsOpts = {
    KEY: fs.readFileSync('./certs/jpmc.key', 'utf-8'),
    CERT: fs.readFileSync('./certs/jpmc.crt', 'utf-8'),
  };
  const options = {
    target: 'https://apigatewayqaf.jpmorgan.com', // target host with the same base path
    changeOrigin: true, // needed for virtual hosted sites
    logLevel: 'debug',
    selfHandleResponse: true,
    agent: new https.Agent({
      key: httpsOpts.KEY && httpsOpts.KEY.replace(/\\n/g, '\n'),
      cert: httpsOpts.CERT && httpsOpts.CERT.replace(/\\n/g, '\n'),
    }),
    pathRewrite: { '^/api': '' },
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        '--> ',
        req.method,
        req.path,
        '->',
        proxyReq.baseUrl + proxyReq.path,
      );
    },
    onProxyRes: responseInterceptor(
      async (responseBuffer, proxyRes, req, res) => {
        const exchange = `[${req.method}] [${proxyRes.statusCode}] ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path}`;
        console.log(exchange);
        // detect json responses
        if (proxyRes.headers['content-type'] === 'application/json') {
          let data = JSON.parse(responseBuffer.toString('utf8'));

          console.log(data);

          // return manipulated JSON
          return JSON.stringify(data);
        }

        // return other content-types as-is
        return responseBuffer;
      },
    ),
    onError: (err, req, res) => {
      console.log(err);
    },
  };
  return createProxyMiddleware(options);
}

app.use('/jwt', generateJWTJose);

// mount `exampleProxy` in web server
app.use('/*', async (req, res, next) => {
  const func = await createProxyConfiguration();
  func(req, res, next);
});

module.exports = app;
