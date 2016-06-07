var log = require('technicolor-logger');
var lambda = require('./lambda');

function run(schedule) {
    var promise = new Promise((resolve, reject) => {
        log.info('Starting Schedule: ' + schedule.Name);
        try {
            lambda.execute(schedule.Lambda, 'start')
                .then(resolve)
                .catch(reject);
        } catch (err) {
            return reject(err);
        }
    });

    return promise;
}

function stop(schedule) {
    var promise = new Promise((resolve, reject) => {
        log.info('Stopping Schedule: ' + schedule.Name)
        try {
            lambda.execute(schedule.Lambda, 'cleanup')
                .then(resolve)
                .catch(reject);
        } catch (err) {
            return reject(err);
        }
    });

    return promise;
}

exports.run = run;
exports.stop = stop;
