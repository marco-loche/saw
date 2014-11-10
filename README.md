# SAW

## Introduction
Saw is a Object Oriented SCORM API Wrapper for SCORM 1.2
### Why
This library allows you to develop a fully testable SCO engine.
## SCORM Documentation
The SCORM 1.2 Run Time Environement specification can be found in the docs/ folder of the project
# Usage
## Installation
```JavaScript
```
## Initialization and usage

```JavaScript
var saw = require('saw');

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

