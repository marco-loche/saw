// __tests__/saw-test.js
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

  it('should have an attribute to store the API handle', function () {
    expect(saw.API).toBeDefined();
  });

  it('should have an attribute to store the LMS initialization status', function () {
    expect(saw.LMSInitialized).toBeDefined();
  });

  it('should have an attribute to store session logs (interactio with the API hanlde)', function () {
    expect(saw.sessionLogs).toBeDefined();
    expect(saw.sessionLogs.length).toEqual(0);
  });

  it('should have an isInitialized function', function () {
    expect(saw.isConfigured).toBeDefined();
  });

  it('should not be initialize before init invocation', function () {
    expect(saw.isConfigured()).toBe(false);
  });

  it('should have an initialize function', function () {
    expect(saw.lmsInitialize).toBeDefined();
  });

  it('should not be initialize before init invocation', function () {
    expect(saw.isInitialized()).toBe(false);
  });

  it('should have an initialize function', function () {
    expect(saw.initialize).toBeDefined();
  });

  it('should have an initialize function', function () {
    expect(saw.logOperation).toBeDefined();
  });
  /**
   * saw.configure()
   */
  describe('configure()', function () {
    describe('configure() with a not available API Adapter', function () {

      it('should throw an error if no API Adapter is available', function () {
        expect(saw.configure).toThrow("A valid SCORM API Adapter can not be found in the window or in the window.opener");
        expect(saw.isConfigured()).toBe(false);
      });
    });

    describe('configure() with an available API Adapter', function () {

      it('should be initialized after init invocation if the adapted is defined in the current window', function () {
        window.API = {};
        saw.configure();
        expect(saw.isConfigured()).toBe(true);
      });

      it('should be initialized after init invocation if the API is defined in the window.opener', function () {
        var opener = window.opener;
        var parent = {};
        // building the nested parent structure with max level of deep in parent search
        for (var i = 0; i++; i <= 7) {
          parent = {'parent': parent};
        }
        window.parent = parent;
        window.opener = {};
        window.opener.API = {};

        saw.configure();
        expect(saw.isConfigured()).toBe(true);
        window.opener = opener;
      });
    });
  });

  /**
   *saw.initializeLMS()
   */
  describe('initializeLMS', function () {
    var LMSInit = jest.genMockFunction();
    var logOperation = jest.genMockFunction();

    beforeEach(function () {
      saw = require('../saw.js');
      saw.logOperation = logOperation;
      window.API = {
        LMSInitialize: LMSInit
      };

    });

    afterEach(function () {
      saw = null;
      delete window.API;
    });

    it('should be ok if the LMS can be initialized', function () {
      //SCORM standard expect a String "true" to be returned
      LMSInit.mockReturnValueOnce("true");

      saw.initialize();
      expect(saw.isInitialized()).toBe(true);
      expect(LMSInit).toBeCalled();
      expect(LMSInit).toBeCalledWith('');
    });

    it('should be ok if the LMS can be initialized but do not return a standard String "true"', function () {
      LMSInit.mockReturnValueOnce(true);

      saw.initialize();
      expect(saw.isInitialized()).toBe(true);
      expect(LMSInit).toBeCalled();
      expect(LMSInit).toBeCalledWith('');
    });

    it('should throw an error if LMS can not be initialized', function () {
      //SCORM standard expect a String "false" to be returned
      LMSInit.mockReturnValueOnce("false");

      expect(function () {
        saw.initialize();
      }).toThrow('LMS Initialization failed');
      expect(saw.isInitialized()).toBe(false);
    });

  });

  /**
   *saw.logOperation()
   */
  describe('logOperation', function () {
    var LMSInit = jest.genMockFunction();
    var LMSGetLastErr = jest.genMockFunction();
    var LMSGetLastErrStr = jest.genMockFunction();
    var LMSGetDia = jest.genMockFunction();

    beforeEach(function () {
      saw = require('../saw.js');
      window.API = {
        LMSInitialize: LMSInit,
        LMSGetLastError: LMSGetLastErr,
        LMSGetLastErrorString: LMSGetLastErrStr,
        LMSGetDiagnostic: LMSGetDia
      };

    });

    afterEach(function () {
      saw = null;
      delete window.API;
    });

    it('should correctly initialized sessionLogs attribute', function () {
      //SCORM standard expect a String "true" to be returned
      LMSInit.mockReturnValueOnce("true");

      saw.initialize();
      expect(saw.sessionLogs.length).toEqual(1);
      expect(saw.sessionLogs[0].scormFn).toEqual('LMSInitialize');
    });

    it('should add a log entry to the sessionLogs attribute when invoked', function () {
      //SCORM standard expect a String "true" to be returned
      LMSInit.mockReturnValueOnce("true");
      LMSGetLastErr.mockReturnValue("0");
      LMSGetLastErrStr.mockReturnValue("NoErrorStr");
      LMSGetDia.mockReturnValue("Diagnostic");
      saw.initialize();
      saw.logOperation("foo", "bar");
      expect(saw.sessionLogs.length).toEqual(2);

      expect(saw.sessionLogs[1].timestamp).toBeDefined();
      expect(saw.sessionLogs[1].scormFn).toEqual('foo');
      expect(saw.sessionLogs[1].scormFnArgs).toEqual('bar');
      expect(saw.sessionLogs[1].errorCode).toEqual("0");
      expect(saw.sessionLogs[1].errorCodeString).toEqual("NoError");
      expect(LMSGetLastErrStr).toBeCalledWith("0");
      expect(saw.sessionLogs[1].errorCodeStringLMS).toEqual("NoErrorStr");
      expect(saw.sessionLogs[1].diagnostic).toEqual("Diagnostic");
    });
  });

});
