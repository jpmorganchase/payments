const path = require('path');
const fs = require('fs');

const basePathToData = path.join(__dirname, 'mockJson');

const getJsonData = function (basePathToData, filename) {
  var filename = path.join(basePathToData, filename);
  return JSON.parse(fs.readFileSync(filename, 'utf-8'));
};

exports.getData = function (request, response) {
  var data = getJsonData(basePathToData, 'mockedData.json');
  return response.send(data);
};