"use strict";

var knex = require('../knex');

function Sensors() {
    return knex('Sensor')();
}

module.exports = {
    Sensors: function () {
        return Sensors();
    },
    SensorById: function (Id) {
        return Sensors().where({Id}).first();
    },
    SensorByName: function (Name) {
        return Sensors().where({Name}).first();
    }
}