const dataController = require('../dataController');
const mockedData = require('../mockJson/mockedData.json');

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

describe('Test the mock data path', () => {
  test('It should respond with mocked data', () => {
    process.env.NODE_ENV = 'development';
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(function (data) {
        return data;
      }),
    };
    const result = dataController.getData(mockRequest, res);
    expect(res.send).toHaveBeenCalled();
    expect(result).toEqual(mockedData);
    console.log(result);
  });
});
