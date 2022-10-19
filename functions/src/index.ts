// @ts-nocheck
const functions = require('firebase-functions');
const search = require('./search');
const user = require('./user');


exports.addToIndex = search.addToIndex
exports.updateIndex = search.addToIndex
exports.deleteFromIndex= search.addToIndex

exports.createUserRecord = user.createUserRecord;

