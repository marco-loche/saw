// __tests__/sawLMSInitialization-test.js
jest.dontMock('../saw.js');

describe('saw', function () {

  beforeEach(function () {
    this.saw = require('../saw.js');
  });

  afterEach(function () {
    delete this.saw;
  });


});
