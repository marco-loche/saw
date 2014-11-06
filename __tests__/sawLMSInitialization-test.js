// __tests__/sawLMSInitialization-test.js
jest.dontMock('../saw.js');

describe('saw', function () {
  var LMSInit = jest.genMockFunction();
  var saw;

  beforeEach(function () {
    saw = require('../saw.js');
    window.API = {
      LMSInitialize: LMSInit
    };
  });

  afterEach(function () {
    delete saw;
    delete window.API;
  });

  it('initializeLMS should be ok if the LMS can be initialized', function () {
    LMSInit.mockReturnValueOnce(true);

    saw.initialize();
    expect(saw.isLMSInitialized()).toBe(true);
    expect(LMSInit).toBeCalled();
    expect(LMSInit).toBeCalledWith('');
  });

  it('initializeLMS throw an error if LMS can not be initialized', function () {
    LMSInit.mockReturnValueOnce(false);

    expect(function(){ saw.initialize(); }).toThrow('LMS Initialization failed');
    expect(saw.isLMSInitialized()).toBe(false);
  });

});
