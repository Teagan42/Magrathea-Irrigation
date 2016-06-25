"use strict";

let shortId = require('shortid');
let userDAO = require('./db/daos/UserDAO.js');
let sfuserDAO = require('./db/daos/SFUserDAO.js');

function ensureProfileDataPersists(username, password) {
    let result = new Promise(function(resolve, reject) {
        verifyUser(username, password)
            .then((user) => {
                return resolve(user);
            }).catch((err) => {
                return reject(err);
            });
    });

    return result;
}

function verifyUser(username, password) {
    let result = new Promise(function(resolve, reject) {
        userDAO.UserByUsername(username)
            .then((user) => {
                if (user) {
                    return resolve(user);
                } else {
                    createUser(username, password)
                        .then((newUser) => {
                            return resolve(newUser);
                        }).catch((err) => {
                            return reject(err);
                        });
                }
            }).catch((err) => {
                return reject(err);
            });
    });

    return result;
}

function createUser(username, password) {
    let result = new Promise(function(resolve, reject) {
        if (!username) { return reject('Username is required.'); }
        if (!password) { return reject('Password is required.'); }

        userDAO.UserByUsername(username)
            .then((result) => {
                if (result) {
                    return reject('Username already exists.');
                } else {
                    let newUser = {
                        Id: shortId.generate()
                        , Username: username
                        , PasswordHash: ''
                    };

                    userDAO.Users().insert(newUser)
                        .then(() => {
                            return resolve(newUser);
                        }).catch((err) => {
                            return reject(err);
                        });
                }
            }).catch((err) => {
                return reject(err);
            });
    });

    return result;
}

module.exports = {
    ensureProfileDataPersists: ensureProfileDataPersists
}