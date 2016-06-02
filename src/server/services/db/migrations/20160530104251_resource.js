"use strict";

let tableName = 'Commandable';

exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, function(table){
        table.string('Id').unique().notNullable();
        table.string('Name').unique().notNullable();
        table.string('Type').notNullable();
        table.string('SubType').notNullable();
        table.string('ApiName').notNullable();
        table.integer('PinNumber');
        table.datetime('CreatedDate').notNullable().defaultTo(knex.fn.now());
        table.datetime('ModifiedDate').notNullable().defaultTo(knex.fn.now());
        table.string('CreatedBy').index().references('Id').inTable('User');
        table.string('ModifiedBy').index().references('Id').inTable('User');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tableName);
};
