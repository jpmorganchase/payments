const express = require('express');
const path = require('path');
const fs = require('fs');
const dataController = require('./dataController');

const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
