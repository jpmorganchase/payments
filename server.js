const express = require('express');
const fs = require('fs');
const https = require('https');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
httpsOpts = {
  key: fs.readFileSync('certs/jpmc.key', 'utf-8'),
  cert: fs.readFileSync('certs/jpmc.crt', 'utf-8'),
};

// proxy middleware options
const options = {
  target: 'https://apigatewayqaf.jpmorgan.com', // target host with the same base path
  changeOrigin: true, // needed for virtual hosted sites
  logLevel: 'debug',
  agent: new https.Agent({
    key: fs.readFileSync('certs/jpmc.key', 'utf-8'),
    cert: fs.readFileSync('certs/jpmc.crt', 'utf-8'),
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
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['access-control-allow-origin'] = 'http://localhost:3000';
    const exchange = `[${req.method}] [${proxyRes.statusCode}] ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path}`;
    console.log(exchange);
  },
  onError: (err, req, res) => {
    console.log(err);
  },
};

// mount `exampleProxy` in web server
app.use('/api', createProxyMiddleware(options));

app.listen(8081, () => {
  console.log('Proxy listening on port 8081');
});
