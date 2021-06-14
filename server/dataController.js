const path = require('path');
const fs = require('fs');
const https = require('https');




const basePathToData = path.join(__dirname, 'mockJson');

const getJsonData = function (basePathToData, filename) {
  var filename = path.join(basePathToData, filename);
  return JSON.parse(fs.readFileSync(filename, 'utf-8'));
};

const gets = (url) => new Promise((resolve, reject) => {
  https.get(url, (response) => {
  let body = ''
  response.on('data', (chunk) => body += chunk)
  response.on('end', () => resolve(body))
  }).on('error', reject)
})

const gatherPacmanData = () => {
  return httpsrequest().then((data) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify(data),
    };
    return response;
});
}

function httpsrequest() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'apigatewayqaf.jpmorgan.com',
      path: '/tsapi/v1/outages',
      method: 'GET',
      cert: fs.readFileSync(path.join(__dirname, '../unicorns/unicorn.crt')),
      key: fs.readFileSync(path.join(__dirname, '../unicorns/private.key'))
    };
     const req = https.request(options, (res) => {
       if (res.statusCode < 200 || res.statusCode >= 300) {
             return reject(new Error('statusCode=' + res.statusCode));
         }
         var body = [];
         res.on('data', function(chunk) {
             body.push(chunk);
         });
         res.on('end', function() {
             try {
                 body = JSON.parse(Buffer.concat(body).toString());
             } catch(e) {
                 reject(e);
             }
             resolve(body);
         });
     });
     req.on('error', (e) => {
       reject(e.message);
     });
     // send the request
    req.end();
 });
}

exports.getData = function (request, response) {
//  var data = getJsonData(basePathToData, 'mockedData.json');
var data = gatherPacmanData();
return response.send(data);
};