"use strict";

let resourceDAO = require('../daos/ResourceDAO');

let tableName = 'Resource';
let oldColumnName = 'PinNumber';
let newColumnName = 'Address';

exports.up = function(knex, Promise) {
    return knex.schema.table(tableName, function (t) {
        t.renameColumn(oldColumnName, newColumnName);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table(tableName, function (t) {
        t.renameColumn(newColumnName, oldColumnName);
    });
};
