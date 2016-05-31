"use strict";

let tableName = 'User';

exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, function(table){
        table.string('Id').unique().notNullable();
        table.string('Username').unique().notNullable();
        table.string('Email');
        table.string('PasswordHash').notNullable();
        table.string('Token').notNullable();
        table.dateTime('TokenExpiration').notNullable().defaultTo(new Date() + 10); // Default to 10 days out
        table.datetime('CreatedDate').notNullable().defaultTo(new Date());
        table.datetime('ModifiedDate').notNullable().defaultTo(new Date());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tableName);
};
