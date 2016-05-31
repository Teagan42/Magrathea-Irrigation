"use strict";

var knex = require('../knex');

function Commandables() {
    return knex('Commandable')();
}

module.exports = {
    Commandables: function () {
        return Commandables();
    },
    CommandableById: function (Id) {
        return Commandables().where({Id}).first();
    },
    CommandableByName: function (Name) {
        return Commandables().where({Name}).first();
    }
}