// __tests__/sawConfiguration-test.js
jest.dontMock('../saw.js');

describe('saw', function () {
  var saw;
  beforeEach(function () {
    saw = require('../saw.js');
  });

  afterEach(function () {
    saw = null;
  });

  it('should be an object', function () {
    expect(saw).toBeDefined();
  });


  it('should have an isInitialized function', function () {
    expect(saw.isConfigured).toBeDefined();
  });

  it('should not be initialize before init invocation', function () {
    expect(saw.isConfigured()).toBe(false);
  });

  it('should have an initialize function', function () {
    expect(saw.initializeLMS).toBeDefined();
  });

  it('should not be initialize before init invocation', function () {
    expect(saw.isLMSInitialized()).toBe(false);
  });

  it('should have an initialize function', function () {
    expect(saw.initialize).toBeDefined();
  });

});
