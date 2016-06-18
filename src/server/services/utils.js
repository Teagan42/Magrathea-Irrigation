"use strict";

const dayOfWeek = [
    'SUNDAY'
    , 'MONDAY'
    , 'TUESDAY'
    , 'WEDNESDAY'
    , 'THURSDAY'
    , 'FRIDAY'
    , 'SATURDAY'
];

function getDayOfWeek(date) {
    if (!(date instanceof Date)) { throw new Error('Not a date'); }

    return dayOfWeek[date.getDay()];
}

exports.getDayOfWeek = getDayOfWeek;