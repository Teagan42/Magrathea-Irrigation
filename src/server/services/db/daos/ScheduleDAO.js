"use strict";

let utils = require('../../utils');
let knex = require('../knex');

function Schedules() {
    return knex('Schedule');
}

function getStartQuery(date) {
    let time = date.getHours() + ':' + date.getMinutes() + ":00";
    let day = utils.getDayOfWeek(date);
    return '(\'' + time + '\' >= "StartTime") AND (\'' + time + '\' <= "EndTime") AND ("DaysOfWeek" = \'ALL\' OR "DaysOfWeek" LIKE \'%' + day + '%\')';
}

function getStopQuery(date) {
    let time = date.getHours() + ':' + date.getMinutes() + ":00";
    let day = utils.getDayOfWeek(date);
    return '((\'' + time + '\' < "StartTime") OR (\'' + time + '\' > "EndTime")) OR ("DaysOfWeek" NOT LIKE \'%' + day + '%\')'
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
            .whereRaw(getStartQuery(date))
            .orWhere('IsRunning', true)
            .orderBy('Priority', 'desc');
    },
    SchedulesToStop: function (date) {
        return Schedules()
            .whereRaw(getStopQuery(date))
            .andWhere("IsRunning", true)
            .orderBy('Priority', 'desc');
    },
    RunningSchedules: function () {
        return Schedules()
            .where('IsRunning', true)
            .orderBy('Priority', 'desc');
    }
}