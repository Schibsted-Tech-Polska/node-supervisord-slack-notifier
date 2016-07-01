'use strict';
const path = require('path');

// this fixes config directory path when script is loaded from outside this directory
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');

var stdin = process.stdin;
var stdout = process.stdout;

require('./notifier.js')(stdin, stdout);

