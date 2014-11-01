// __tests__/saw-test.js
jest.dontMock('../saw.js');

describe('saw', function () {

  beforeEach(function () {
    this.saw = require('../saw.js');
  });

  afterEach(function () {
    delete this.saw;
  });

  it('should be an object', function () {
    expect(this.saw).toBeDefined();
  });

  it('should have an initialize function', function () {
    expect(this.saw.initialize).toBeDefined();
  });

  it('should have an isInitialized function', function () {
    expect(this.saw.isInitialized).toBeDefined();
  });

  it('should not be initialize before init invocation', function () {
    expect(this.saw.isInitialized()).toBe(false);
  });

  it('should be initilized after init invocation', function () {
    this.saw.initialize();
    expect(this.saw.initialized).toBe(true);
  });
});
