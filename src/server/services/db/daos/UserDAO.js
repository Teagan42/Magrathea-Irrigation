"use strict";

let knex = require('../knex');

function Users() {
    return knex('User');
}


module.exports = {
    Users: function () {
        return Users();
    },
    UserById: function (Id) {
        return Users().where({Id}).first();
    },
    UserByUsername: function (Username) {
        return Users().where({Username}).first();
    }
}