const dataController = require('../dataController');
const mockedPacmanData = require('../mockJson/uf-pacman.json');
const nock = require('nock');
const mockRequest = {
  on: jest.fn(),
};
const mockedResponse = {
  status: jest.fn(function (status) {
    this.status = status;
    return;
  }),
  send: jest.fn(function (data) {
    return data;
  }),
  on: jest.fn(),
};
const validResponse = { outageEventDetailsList: [] };
const errorResponse = 'Error hitting API, statusCode= 503';

const createNock = (statusCode, response) => {
  nock('http://apigatewayqaf.jpmorgan.com')
    .get('/tsapi/v1/outages')
    .reply(statusCode, response);
};
describe('Test the mock data path', () => {
  test('It should respond with mocked data', () => {
    process.env.NODE_ENV = 'development';
    const result = dataController.getPacmanData(mockRequest, mockedResponse);
    expect(mockedResponse.send).toHaveBeenCalled();
    expect(JSON.parse(result).data).toEqual(mockedPacmanData);
  });
});

describe('Test we handle errors from the API', () => {
  test('It should respond with error message', () => {
    process.env.NODE_ENV = 'production';
    createNock(503, 'Error');
    return dataController
      .getPacmanData(mockRequest, mockedResponse)
      .catch((error) => {
        expect(error).toEqual(new Error(errorResponse));
      });
  });
});
