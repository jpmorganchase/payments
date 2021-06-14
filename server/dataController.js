const path = require('path');
const fs = require('fs');

const basePathToData = path.join(__dirname, 'mockJson');

const getJsonData = function (basePathToData, filename) {
  var filename = path.join(basePathToData, filename);
  console.log(filename);
  return JSON.parse(fs.readFileSync(filename, 'utf-8'));
};

exports.getData = function (request, response) {
  var data = getJsonData(basePathToData, 'mockedData.json');
  console.log(data);
  return response.send(data);
};