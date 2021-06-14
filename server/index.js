/* eslint-disable no-console */
const express = require("express");
var dataController = require('./dataController');

const app = express();

app.get('/api', dataController.getData);

app.listen(process.env.PORT || 3001);