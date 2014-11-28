# SAW
[![Code Climate](https://codeclimate.com/github/marco-loche/saw/badges/gpa.svg)](https://codeclimate.com/github/marco-loche/saw)
[![Test Coverage](https://codeclimate.com/github/marco-loche/saw/badges/coverage.svg)](https://codeclimate.com/github/marco-loche/saw)
[![Build Status](https://travis-ci.org/marco-loche/saw.svg)](https://travis-ci.org/marco-loche/saw)
## Introduction
Saw is an Object Oriented SCORM API Wrapper for SCORM 1.2
### Why
This library allows you to develop a fully testable SCO engine.
## SCORM Documentation
The SCORM 1.2 Run Time Environement specification can be found in the docs/ folder of the project
# Usage
## Installation
### with npm
```Bash
npm install scorm-api-wrapper --save
```
## Initialization and usage

```JavaScript
var saw = require('scorm-api-wrapper');

/* Initialize the API wrapper and establish connection to the LMS*/
saw.initialize();

/* Set a value of the SCORM Data Model*/
saw.setScormValue('cmi.core.score', 85 );

/* Get a value of the SCORM Data Model*/
var value = saw.getScormValue('cmi.core.score');

/* Persist current state of the Data Model (i.e. LMSCommit() )*/
saw.commit();

/* Persist the Data Model and close the connection to the LMS*/
saw.finish();

```

# Development

 * Fork the project
 * Clone the project to your machine
 * Install [nodejs](http://nodejs.org/)
 * Install the dependencies with ```npm install```
 * Run test ```npm test```
 * You're ready!


