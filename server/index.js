const express = require('express');
const path = require('path');
const fs = require('fs');
const dataController = require('./dataController');

const options = {
  cert: fs.readFileSync(path.join(__dirname, '../unicorns/unicorn.crt')),
  key: fs.readFileSync(path.join(__dirname, '../unicorns/private.key')),
};
const PORT = process.env.PORT || 5000;

const app = express();
//app.use(express.static(path.join(__dirname, '../client/build/')));

app.get('/', (req, res) => {
  console.log('he');
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get('/api',dataController.getData);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
