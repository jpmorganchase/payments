const request = require('supertest');
const app = require('../app');

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app).get('/').expect(200);
  });
});

describe('Test the service status API path', () => {
  test('It should respond to the GET method', () => {
    return request(app).get('/api/gatherServiceStatus').expect(200);
  });
});

describe('Test the transactions API path', () => {
  test('It should respond with 200 to the GET method', () => {
    return request(app).get('/api/gatherTransactions').expect(200);
  });
});

describe('Test the balance API path', () => {
  test('It should respond to the GET method', () => {
    return request(app).get('/api/gatherBalance').expect(200);
  });
});
