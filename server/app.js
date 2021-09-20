const express = require('express');
const routes = require('./routes');
const config = require('./config');
const app = express();
app.listen(config.port, () => console.log(`Listening on ${config.port}`));

app.use(config.api.prefix, routes);

module.exports = app;
ss;
