"use strict";

let tableName = 'Schedule';

exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, function(table){
        table.string('Id').unique().notNullable();
        table.string('CommandableId').index().references('Id').inTable('Commandable')
        table.string('Name').notNullable();
        table.time('StartTime').notNullable();
        table.string('Duration').notNullable();
        table.string('DaysOfWeek').notNullable();
        table.string('RunLambda').notNullable();
        table.string('CleanupLambda').notNullable();
        table.integer('Priority').notNullable().defaultTo(0);
        table.boolean('Enabled').notNullable().defaultTo(true);
        table.boolean('IsRunning').notNullable().defaultTo(false);
        table.datetime('CreatedDate').notNullable().defaultTo(new Date());
        table.datetime('ModifiedDate').notNullable().defaultTo(new Date());
        table.string('CreatedBy').index().references('Id').inTable('User');
        table.string('ModifiedBy').index().references('Id').inTable('User');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tableName);
};
