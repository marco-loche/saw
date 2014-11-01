//     saw.js 0.0.0
//     (c) 2014 Marco Loche
//     Underscore may be freely distributed under the MIT license.
"use strict";

(function () {

  var saw = {
    initialized:   false,
    initialize:    function () {
      this.initialized = true;
    },
    isInitialized: function () {
      return this.initialized;
    }

  }

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = saw;
  }
  else if (typeof define === 'function' && define.amd) {
    define(saw);
  }
}.call(this));
