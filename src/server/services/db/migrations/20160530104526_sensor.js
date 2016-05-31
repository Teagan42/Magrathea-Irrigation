"use strict";

let tableName = 'Sensor';

exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, function(table){
        table.string('Id').unique().notNullable();
        table.string('Name').unique().notNullable();
        table.string('Type').notNullable();
        table.string('ApiName').notNullable();
        table.boolean('Enabled').notNullable().defaultTo(true);
        table.integer('PinNumber');
        table.datetime('CreatedDate').notNullable().defaultTo(new Date());
        table.datetime('ModifiedDate').notNullable().defaultTo(new Date());
        table.string('CreatedBy').index().references('Id').inTable('User');
        table.string('ModifiedBy').index().references('Id').inTable('User');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tableName);
};
