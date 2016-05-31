"use strict";
var log = require('../services/log.js');


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
        , {}
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
        }
        , 'Add a new valve to the database.');
}

function getValves(req, res, next) {

}

function getValve(req, res, next) {

}

function updateValve(req, res, next) {

}

function addValve(req, res, next) {

}

exports.init = init;



