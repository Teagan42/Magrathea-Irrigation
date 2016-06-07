var CronJob = require('cron').CronJob;
var log = require('../services/log');
var scheduleDAO = require('../services/db/daos/ScheduleDAO');
var scheduleService = require('../services/schedule');
const cronSchedule = '* * * * *';
var job = undefined;
var runningSchedules = {};

function execute() {
    var promise = new Promise((resolve, reject) => {
        log.info('BACKGROUND JOB : SCHEDULE : EXECUTE : Executing schedules.');
        startJobs()
            .then(() => {
                stopJobs()
                    .then(resolve)
                    .catch(reject);
            })
            .catch(reject);
    });

    return promise;
}

function startJobs() {
    var promise = new Promise((resolve, reject) => {
        log.info('BACKGROUND JOB : SCHEDULE : STARTJOBS : STARTJOBS jobs.');
        scheduleDAO.SchedulesFor(new Date())
            .then((schedules) => {
                schedules.forEach((schedule) => {
                    scheduleService.run(schedule)
                        .then(() => {
                            runningSchedules[schedule.Id] = true;
                        }).catch((err) => {
                            log.error('BACKGROUND JOB : SCHEDULE : STARTJOBS : ' + err);
                            return reject(err);
                        });
                });
            })
            .catch(reject);

        return resolve();
    });

    return promise;
}

function stopJobs() {
    var promise = new Promise((resolve, reject) => {
        log.info('BACKGROUND JOB : SCHEDULE : STARTJOBS : STOPJOBS jobs.');
        scheduleDAO.SchedulesToStop(new Date())
            .then((schedules) => {
                scheules.forEach((schedule) => {
                    scheduleService.stop(schedule)
                        .then(() => {
                            delete runningSchedules[schedule.Id];
                        }).catch((err) => {
                            log.error('BACKGROUND JOB : SCHEDULE : STOPJOBS : ' + err);
                            return reject(err);
                        });
                });
            })
            .catch(reject);

        return resolve();
    });

    return promise;
}

function start() {
    function executeHandler() {
        execute()
            .then(() => {
                log.info('BACKGROUND JOB : SCHEDULE : START : DONE');
            })
            .catch((err) => {
                log.error('BACKGROUND JOB : SCHEDULE : START : ' + err);
            });
    }

    var promise = new Promise((resolve, reject) => {
        log.info('BACKGROUND JOB : SCHEDULE : START : Starting schedule background job.');
        if (job) {
            cleanup();
        }

        job = new CronJob(cronSchedule
            , executeHandler
            , cleanup
            , true /* Start the job right now */
        );

        executeHandler();

        resolve();
    });

    return promise;
}

function stop() {
    var promise = new Promise((resolve, reject) => {
        log.info('BACKGROUND JOB : SCHEDULE : STOP : Stopping schedule background job.');
        cleanup()
            .then(resolve)
            .catch(reject);
    });

    return promise;
}

function cleanup() {
    var promise = new Promise((resolve, reject) => {
        log.info('BACKGROUND JOB : SCHEDULE : CLEANUP : Cleaning up schedule background job.');
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