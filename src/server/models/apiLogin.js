"use strict";

let init = function(apiModel) {
    apiModel.registerPublicRoute('get'
        , 'authenticate'
        , '/authenticate'
        , authenticate
        , {}
        , 'Authenticate with the system.');

    apiModel.registerPublicRoute('get'
        , 'login'
        , '/login'
        , login
        , {
            'user': {
                'required': true
                , 'dataType': 'string'
            }
            , 'password': {
                'required': true,
                'dataType': 'string'
            }
        }
        , 'Login to the system.');

    apiModel.registerPublicRoute('get'
        , 'logout'
        , '/logout'
        , logout
        , {}
        , 'Log out of the system.');

    apiModel.registerPublicRoute('get'
        , 'index'
        , '/'
        , index
        , {}
        , 'Index Page');
}

function authenticate(req, res, next) {
    res.redirect('/home');
}

function logout(req, res, next) {
    res.clearCookie('magratheaToken');
    req.logout();
    res.redirect('/');
}

function index(req, res, next) {
    if (req.user) {
//        res.cookie('magratheaToken', req.user.Id, { maxAge: 2592000000 });
    }
    next();
}

function login(req, res, next) {
    if (false) { //!res.body && !res.body.user && !res.body.password) {
        res.status(400)
            .json({
                message: 'Invalid user or password.'
                , code: 400
            });
    } else {
        res.cookie('magratheaToken', '123', { maxAge: 2592000000 });
        res.redirect('/');
    }
}

exports.init = init;



