"use strict";
let path = require('path');

let models = {
    "login" : require(path.join(__dirname, '/models/apiLogin'))
    , "valves": require(path.join(__dirname, '/models/apiValve'))
}

exports.models = models;