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

  var saw = {
    initialized: false,
    API:         null,

    initialize: function () {
      this.initialized = true;
      this.API = findAPI(window);
      if ((this.API == null) && (window.opener != null) && (typeof(window.opener) != "undefined")) {
        this.API = findAPI(window.opener);
      }

      if (this.API == null) {
        throw new Error("A valid SCORM API Adapter can not be found in the window or in the window.opener");
      }
      this.initialized = true;

    }
    ,

    isInitialized: function () {
      return (this.initialized && this.API != null);
    }

  }

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = saw;
  }
  else if (typeof define === 'function' && define.amd) {
    define(saw);
  }
}.call(this));
