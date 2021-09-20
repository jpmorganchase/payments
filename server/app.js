const express = require('express');
const config = require('./config');
const loader = require('./loaders');

const app = express();

function startServer() {
  app
    .listen(config.port, () => {
      console.log(`
    ################################################
    🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
  `);
      loader.load(app);
      loader.loadData();
    })
    .on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
  loader.load(app);
}
startServer();
