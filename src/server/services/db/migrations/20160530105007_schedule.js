"use strict";

let tableName = 'Schedule';

exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, function(table){
        table.string('Id').unique().notNullable();
        table.string('ResourceId').index().references('Id').inTable('Resource')
        table.string('Name').notNullable();
        table.datetime('StartTime').notNullable();
        table.string('Duration').notNullable();
        table.string('DaysOfWeek').notNullable();
        table.string('Lambda').notNullable();
        table.integer('Priority').notNullable().defaultTo(0);
        table.boolean('Enabled').notNullable().defaultTo(true);
        table.boolean('IsRunning').notNullable().defaultTo(false);
        table.datetime('CreatedDate').notNullable().defaultTo(knex.fn.now());
        table.datetime('ModifiedDate').notNullable().defaultTo(knex.fn.now());
        table.string('CreatedBy').index().references('Id').inTable('User');
        table.string('ModifiedBy').index().references('Id').inTable('User');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tableName);
};
