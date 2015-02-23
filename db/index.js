'use strict';

// Initialize Sequelize
var Sequelize = require('sequelize');
var path = require('path');

var dbUser = '';
var dbPassword = '';
var dbName = '';
var dbOptions = {dialect: 'sqlite'};

if ('test' === process.env.NODE_ENV) {
  dbOptions.storage = path.join(__dirname, 'test.db');
} else {
  // Default DB settings, for development
}

exports.sequelize = new Sequelize(dbUser, dbPassword, dbName, dbOptions);
