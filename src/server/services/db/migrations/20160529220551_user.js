"use strict";

let tableName = 'User';

exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, function(table){
        table.string('Id').unique().notNullable();
        table.string('Username').unique().notNullable();
        table.string('Email');
        table.string('PasswordHash').notNullable();
        table.string('Token').notNullable();
        table.dateTime('TokenExpiration').notNullable();
        table.datetime('CreatedDate').notNullable().defaultTo(knex.fn.now());
        table.datetime('ModifiedDate').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tableName);
};
