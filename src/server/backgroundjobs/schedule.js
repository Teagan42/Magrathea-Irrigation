var CronJob = require('cron').CronJob;
var log = require('../services/log');
var scheduleDAO = require('../services/db/daos/ScheduleDAO');
var scheduleService = require('../services/schedule');
const cronSchedule = '* * * * *';
var job = undefined;
var runningSchedules = {};

function filterJobsToStart(schedules) {
    return schedules
        .filter((schedule) => {
            return runningSchedules.includes(schedule.Id);
        });
}

function filterJobsToStop(schedules) {
    return schedules
        .filter((schedule) => {
            var currentDate = new Date().getDate();
            log.debug('CurrentDate: ' + currentDate);
            log.debug('Schedule: ' + JSON.stringify(schedule));

            return false;
        });
}

function execute() {
    var promise = new Promise((resolve, reject) => {
        log.info('Executing schedules.');
        scheduleDAO.SchedulesFor(new Date())
            .then((results) => {
                var newSchedules = filterJobsToStart(results);

                newSchedules.forEach((schedule) => {
                    runningSchedules[schedule.Id] = true;
                    scheduleService.run(schedule)
                        .catch((err) => {
                            return reject(err);
                        });
                });

                return accept();
            }).catch((err) => {
                log.error(err);
                return reject(err);
            });
    });

    return promise;
}

function startJobs() {
    var promise = new Promise((resolve, reject) => {
        log.info('Starting jobs.');
        scheduleDAO.RunningSchedules()
            .then((results) => {
                var doneSchedules = filterJobsToStop(results);

                doneSchedules.forEach((schedule) => {
                    scheduleService.stop(schedule)
                        .then(() => {
                            delete runningSchedules[schedule.Id];
                        }).catch((err) => {
                            log.error(err);
                            return reject(err);
                        });
                });

                return resolve();
            }).catch((err) => {
                log.error(err);
                return reject(err);
            });
    });

    return promise;
}

function start() {
    function executeHandler() {
        execute()
            .then((result) => {
                log.info(result);
            })
            .catch((err) => {
                log.error(err);
            });
    }

    var promise = new Promise((resolve, reject) => {
        log.info('Starting schedule background job.');
        if (job) {
            cleanup();
        }

        job = new CronJob(cronSchedule
            , executeHandler
            , cleanup
            , true /* Start the job right now */
        );

        resolve();
    });

    return promise;
}

function stop() {
    var promise = new Promise((resolve, reject) => {
        log.info('Stopping schedule background job.');
        cleanup()
            .then(resolve)
            .catch(reject);
    });

    return promise;
}

function cleanup() {
    var promise = new Promise((resolve, reject) => {
        log.info('Cleaning up schedule background job.');
        if (job) {
            job.stop();
            job = undefined;
        }

        runningSchedules.forEach((schedule) => {
            schedule.cancel()
                .catch((err) => {
                    reject(err);
                });
        });

        runningSchedules = [];

        resolve();
    });

    return promise;
}

exports.start = start;
exports.execute = execute;
exports.stop = stop;