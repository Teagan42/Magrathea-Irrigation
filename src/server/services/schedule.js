"use strict"

let lambda = require('./lambda');
let scheduleDAO = require('./db/daos/ScheduleDAO');

function run(schedule) {
    let promise = new Promise((resolve, reject) => {
        if (schedule.IsRunning) { return resolve(); }

        global.log.info('Starting Schedule: ' + schedule.Name);

        try {
            lambda.execute(schedule.Lambda, 'start')
                .then((result) => {
                    scheduleDAO.ScheduleById(schedule.Id)
                        .update({
                            IsRunning: true
                        })
                        .then(resolve)
                        .catch(reject);
                }).catch(reject);
        } catch (err) {
            return reject(err);
        }
    });

    return promise;
}

function stop(schedule) {
    let promise = new Promise((resolve, reject) => {
        if (!schedule.IsRunning) { return resolve(); }

        global.log.info('Stopping Schedule: ' + schedule.Name);

        try {
            lambda.execute(schedule.Lambda, 'cleanup')
                .then((result) => {
                    scheduleDAO.ScheduleById(schedule.Id)
                        .update({
                            IsRunning: false
                        })
                        .then(resolve)
                        .catch(reject);
                }).catch(reject);
        } catch (err) {
            return reject(err);
        }
    });

    return promise;
}

exports.run = run;
exports.stop = stop;