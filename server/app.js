const express = require('express');
const path = require('path');
const fs = require('fs');
const dataController = require('./dataController');

const app = express();
app.use(
  express.static(path.join(__dirname, '../client/build/'), {
    maxAge: 3110400000,
  }),
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get('/api', dataController.getData);

module.exports = app;
