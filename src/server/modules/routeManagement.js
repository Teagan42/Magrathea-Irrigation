"use strict";

var config = require('../../../config.json');
var apiModel = require('./routeManagementModel.js');
var log = require('../services/log.js');
var models = require('../routes.js').models;

apiModel.addAuthenticationHandler((q,r,n) => {
    if(q.user) {return n();}
    else {r.status(401); r.redirect('/login');return r.send();}
});

function setup(app) {
    //Register routeMangement events
    apiModel.routeRegistered.on('registeredSuccessfully', function(route) {
        if (!route.method) {
            // throw error
        } else {
            preRegisterRoute(route);
            app[route.method](route.pattern, route.handler);
        }
    });

    apiModel.routeRegisteredError.on('registrationError', function(route) {
        throw new Error('Unable to register route:', route);
    });

    setupRoutes(models);
}

function preRegisterRoute(route) {
    var tempRoute = route;

    if (config.logRouteRegistration) {
        log.info(JSON.stringify(tempRoute));
    }
}

function setupRoutes(models) {
    for (var prop in models) {
        if (models[prop]) {
            models[prop].init(apiModel);
        }
    }
}

exports.setup = setup;