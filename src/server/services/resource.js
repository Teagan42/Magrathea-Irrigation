let resourceDAO = require('./db/daos/resourceDAO');

let config = {};
let apis = {};

function init(cfg) {
    config = cfg || {};

    config.apis.forEach((api) => {
        apis[api.name] = require('./apis/' + api.name);
        if (apis[api.name].init) {
            apis[api.name].init(api);
        }
    });
}

function read(deviceName) {
    var promise = new Promise((resolve, reject) => {
        resourceDAO.ResourceByName(deviceName)
            .then((device) => {
                var api = config[device.ApiName];
                if (!api) reject('No API by name ' + device.ApiName);
                if (!api.readSync) reject('API does not have read access');

                api.readSync(device)
                    .then(resolve)
                    .catch(reject);
            })
            .catch(reject);
    });

    return promise;
}

function write(deviceName, value) {
    var promise = new Promise((resolve, reject) => {
        resourceDAO.ResourceByName(deviceName)
            .then((device) => {
                var api = config[device.ApiName];
                if (!api) reject('No API by name ' + device.ApiName);
                if (!api.writeSync) reject('API does not have write access');

                api.writeSync(device, value)
                    .then(resolve)
                    .catch(reject);
            })
            .catch(reject);
    });

    return promise;
}

exports.init = init;
exports.read = read;
exports.write = write;