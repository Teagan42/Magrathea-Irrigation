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
        var time = date.getHours() + ':' + date.getMinutes() + ":00";
        return Schedules()
            .whereRaw('(? >= "StartTime") AND (? <= "EndTime")', [time, time])
            .orWhere('IsRunning', true)
            .orderBy('Priority', 'desc');
    },
    SchedulesToStop: function (date) {
        var time = date.getHours() + ':' + date.getMinutes() + ":00";
        return Schedules()
            .whereRaw('((? < "StartTime") OR (? > "EndTime"))', [time, time])
            .andWhere("IsRunning", true)
            .orderBy('Priority', 'desc');
    },
    RunningSchedules: function () {
        return Schedules()
            .where('IsRunning', true)
            .orderBy('Priority', 'desc');
    }
}