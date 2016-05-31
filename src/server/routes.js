"use strict";
let path = require('path');

let models = {
    "login" : require(path.join(__dirname, '/models/apiLogin'))
}

exports.models = models;