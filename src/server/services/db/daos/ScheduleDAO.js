"use strict";

var knex = require('../knex');

function Schedules() {
    return knex('Schedule');
}

module.exports = {
    Schedules: function () {
        return Schedules();
    },
    ScheduleById: function (Id) {
        return Schedules().where({Id}).first();
    },
    SchedulesFor: function (date) {
        return Schedules()
            .whereRaw('StartTime < ? AND StartTime + Duration > ?', [date, date])
            .orWhere('IsRunning', true)
            .orderBy('Priority', 'desc');
    },
    RunningSchedules: function () {
        return Schedules()
            .where('IsRunning', true)
            .orderBy('Priority', 'desc');
    }
}