"use strict";

let knex = require('../knex');

function Resources() {
    return knex('Resource');
}

module.exports = {
    Resources: function () {
        return Resources();
    },
    ResourceById: function (Id) {
        return Resources().where({Id}).first();
    },
    ResourceByName: function (Name) {
        return Resources().where({Name}).first();
    }
}