const request = require('supertest');
const app = require('../app');

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app).get('/').expect(200);
  });
});

describe('Test the pacman API path', () => {
  test('It should response the GET method', () => {
    return request(app).get('/api').expect(200);
  });
});
