"use strict";

let tableName = 'History';

exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, function(table){
        table.string('Id').unique().notNullable();
        table.string('Type').notNullable();
        table.string('RecordId').notNullable();
        table.datetime('Timestamp').notNullable();
        table.string('Value');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tableName);
};
