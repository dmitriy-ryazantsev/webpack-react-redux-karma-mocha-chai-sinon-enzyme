'use strict';

let context = require.context('.', true, /index.js?$/);
context.keys().forEach(context);

module.exports = context;
