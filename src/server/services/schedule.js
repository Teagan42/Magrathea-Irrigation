var log = require('./log');

function run(schedule) {
    var promise = new Promise((resolve, reject) => {
        log.info('Starting Schedule: ' + schedule.Name);
        try {
            var result = eval(schedule.StartLambda);
            resolve(result);
        } catch (err) {
            reject(err);
        }
    });

    return promise;
}

function stop(schedule) {
    var promise = new Promise((resolve, reject) => {
        log.info('Stopping Schedule: ' + schedule.Name)
        try {
            var result = eval(schedule.CleanupLambda);
            resolve(result);
        } catch (err) {
            reject(err);
        }
    });

    return promise;
}

exports.run = run;
exports.stop = stop;