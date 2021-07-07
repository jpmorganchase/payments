const dataController = require('../dataController');
const mockedData = require('../mockJson/mockedData.json');
const nock = require('nock');

const mockRequest = {
  on: jest.fn(),
};
const mockedResponse = {
  status: 200,
  send: jest.fn(function (data) {
    return data;
  }),
  on: jest.fn(),
};
const validResponse = { outageEventDetailsList: [] };
const errorResponse = 'Error hitting API, statusCode= 503';

const createNock = (statusCode, response) => {
  nock('https://apigatewayqaf.jpmorgan.com')
    .get('/tsapi/v1/outages')
    .reply(statusCode, response);
};
describe('Test the mock data path', () => {
  test('It should respond with mocked data', () => {
    process.env.NODE_ENV = 'development';
    const result = dataController.getData(mockRequest, mockedResponse);
    expect(mockedResponse.send).toHaveBeenCalled();
    expect(result).toEqual(mockedData);
  });
});

describe('Test we handle results', () => {
  test('It should respond with results for parsing on frontend', () => {
    process.env.NODE_ENV = 'production';
    createNock(200, validResponse);
    return dataController.getData(mockRequest, mockedResponse).then((res) => {
      expect(res).toEqual(JSON.stringify(validResponse));
    });
  });
});

describe('Test we handle errors from the API', () => {
  test('It should respond with error message', () => {
    process.env.NODE_ENV = 'production';
    createNock(503, 'Error');
    return dataController
      .getData(mockRequest, mockedResponse)
      .catch((error) => {
        expect(error).toEqual(new Error(errorResponse));
      });
  });
});
