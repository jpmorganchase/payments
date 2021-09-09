const express = require('express');
const path = require('path');
const fs = require('fs');
const dataController = require('./dataController');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});
app.get('/api/gatherPacman', dataController.getPacmanData);

module.exports = app;
