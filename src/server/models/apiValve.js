"use strict";
var log = require('technicolor-logger');
var resourceDAO = require('../services/db/daos/ResourceDAO');

var init = function(apiModel) {
    apiModel.registerPublicRoute('get'
        , 'valve'
        , '/api/valves'
        , getValves
        , {}
        , 'Retrieve a list of valves in the database.');

    apiModel.registerPublicRoute('get'
        , 'valve'
        , '/api/valves/:valveId'
        , getValve
        , { }
        , 'Retrieve the information about a specific valve.');

    apiModel.registerPublicRoute('post'
        , 'valve'
        , '/api/valves/:valveId'
        , updateValve
        , {
            'name': {
                'required': false
                , 'dataType': 'string'
            }
            , 'pin': {
                'required': false
                , 'dataType': 'int'
            }
        }
        , 'Update the valve record in the database.');

    apiModel.registerPublicRoute('put'
        , 'valve'
        , '/api/valves'
        , addValve
        , {
            'name': {
                'required': true
                , 'dataType': 'string'
            }
            , 'pin': {
                'required': true
                , 'dataType': 'int'
            }
        }
        , 'Add a new valve to the database.');
}

function checkBodyFor(fields, req) {
    var promise = new Promise((resolve, reject) => {
        var msg;
        if (!req.body) {
            return reject('No payload to process.');
        }
        if (fields) {
            fields.forEach((field) => {
                if (!req.body[field]) {
                    msg = 'Payload is missing required field: ' + field;
                }
            });
        }

        if (msg) { reject(msg); }

        return resolve();
    });

    return promise;
}

function getValves(req, res, next) {

}

function getValve(req, res, next) {

}

function updateValve(req, res, next) {
    checkBodyFor([])
        .then(() => {
            // TODO
            var pin = req.body.pin;
            var name = req.body.name;
        }).catch((err) => {
            res.status(400)
                .json({
                    message: err
                    , code: 400
                });
        });
}

function addValve(req, res, next) {
    checkBodyFor(['name', 'pin'])
        .then(() => {
            // TODO
        }).catch((err) => {
            res.status(400)
                .json({
                    message: err
                    , code: 400
                });
        });
}

exports.init = init;



