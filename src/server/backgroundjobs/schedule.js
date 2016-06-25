let CronJob = require('cron').CronJob;
let scheduleDAO = require('../services/db/daos/ScheduleDAO');
let scheduleService = require('../services/schedule');
const cronSchedule = '* * * * *';
let job = undefined;
let runningSchedules = {};

function execute() {
    let promise = new Promise((resolve, reject) => {
        global.log.info('BACKGROUND JOB : SCHEDULE : EXECUTE : Executing schedules.');
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
    let promise = new Promise((resolve, reject) => {
        global.log.info('BACKGROUND JOB : SCHEDULE : STARTJOBS : Running jobs.');
        scheduleDAO.SchedulesFor(new Date())
            .then((schedules) => {
                schedules.forEach((schedule) => {
                    scheduleService.run(schedule)
                        .then(() => {
                            runningSchedules[schedule.Id] = true;
                        }).catch((err) => {
                            global.log.error('BACKGROUND JOB : SCHEDULE : STARTJOBS : ' + err);
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
    let promise = new Promise((resolve, reject) => {
        global.log.info('BACKGROUND JOB : SCHEDULE : STARTJOBS : Stopping jobs.');
        scheduleDAO.SchedulesToStop(new Date())
            .then((schedules) => {
                schedules.forEach((schedule) => {
                    scheduleService.stop(schedule)
                        .then(() => {
                            delete runningSchedules[schedule.Id];
                        }).catch((err) => {
                            global.log.error('BACKGROUND JOB : SCHEDULE : STOPJOBS : ' + err);
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
                global.log.info('BACKGROUND JOB : SCHEDULE : START : DONE');
            })
            .catch((err) => {
                global.log.error('BACKGROUND JOB : SCHEDULE : START : ' + err);
            });
    }

    let promise = new Promise((resolve, reject) => {
        global.log.info('BACKGROUND JOB : SCHEDULE : START : Starting schedule background job.');
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
    let promise = new Promise((resolve, reject) => {
        global.log.info('BACKGROUND JOB : SCHEDULE : STOP : Stopping schedule background job.');
        cleanup()
            .then(resolve)
            .catch(reject);
    });

    return promise;
}

function cleanup() {
    let promise = new Promise((resolve, reject) => {
        global.log.info('BACKGROUND JOB : SCHEDULE : CLEANUP : Cleaning up schedule background job.');
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