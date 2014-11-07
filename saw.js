//     saw.js 0.0.0
//     (c) 2014 Marco Loche
//     SAW may be freely distributed under the MIT license.
//     http://marco-loche.mit-license.org/
"use strict";

(function () {

  var findAPITries = 0;
  // The function charged to locate the API adapter object presented by the LMS.
  // As described in section 3.3.6.1 of the documentation.
  var findAPI = function (win) {
    if (win == null) {
      return null;
    }
    while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
      findAPITries++;
      if (findAPITries > 7) {
        return null;
      }
      win = win.parent;
    }

    return win.API;
  };
  var scormStatusCodeString = {
    '0':   'NoError',
    '101': 'GeneralException',
    '102': 'ServerBusy',
    '201': 'InvalidArgumentError',
    '202': 'ElementCannotHaveChildren',
    '203': 'ElementIsNotAnArray',
    '301': 'NotInitialized',
    '401': 'NotImplementedError',
    '402': 'InvalidSetValue',
    '403': 'ElementIsReadOnly',
    '404': 'ElementIsWriteOnly',
    '405': 'IncorrectDataType'
  };

  var saw = {
    LMSInitialized: false,
    API:            null,
    sessionLogs:    [],

    configure: function () {
      this.API = findAPI(window);
      if ((this.API == null) && (window.opener != null) && (typeof(window.opener) != "undefined")) {
        this.API = findAPI(window.opener);
      }

      if (this.API == null) {
        throw new Error("A valid SCORM API Adapter can not be found in the window or in the window.opener");
      }
    },

    isConfigured: function () {
      return !(this.API == null);
    },

    initializeLMS: function () {
      //see 3.2.2.1 LMSInitialize
      this.LMSInitialized = "true" === String(this.API.LMSInitialize(""));
     // this.logOpertion('LMSInitialize');
      if (!this.isLMSInitialized()) {
        throw new Error("LMS Initialization failed");
      }
    },

    isLMSInitialized: function () {
      return this.LMSInitialized;
    },

    // A convenience method that do the correct sequence of calls for the object initialization
    initialize:       function () {
      this.configure();
      this.initializeLMS();
    },

    logOpertion: function (scormAPIFn, scormAPIFnArguments) {
      var scormLastErrCode = this.API.LMSGetLastError();
      var log = {
        'timestamp':       Date.now(),
        'scormFn':         scormAPIFn,
        'scormFnArgs':     scormAPIFnArguments,
        'errorCode':       this.API.LMSGetLastErrorString(scormLastErrCode),
        'errorCodeString': scormStatusCodeString[scormLastErrCode],
        'diagnostic':      this.API.LMSGetDiagnostic(scormLastErrCode)
      };

      this.sessionLogs.push(log);
    }

  };

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = saw;
  }
  else if (typeof define === 'function' && define.amd) {
    define(saw);
  }
}.call(this));
