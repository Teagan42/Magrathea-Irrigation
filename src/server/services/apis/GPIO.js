"use strict"

const API_NAME = 'GPIO';
const resourceTypeToDirection = {
    valve: 'out'
    , sensor: 'in'
};

const validPins = [
    2
    , 3
    , 4
    , 5
    , 6
    , 7
    , 8
    , 9
    , 10
    , 11
    , 12
    , 13
    , 14
    , 15
    , 16
    , 17
    , 18
    , 19
    , 20
    , 21
    , 22
    , 23
    , 24
    , 25
    , 26
    , 27
];

let GPIO = require('onoff').Gpio;
let resourceCache = {};

var Pin = function (resource) {
    this.id = resource.Id;
    this.gpio = new GPIO(resource.PinNumber
        , resourceTypeToDirection[resource.Type]);
};

function validate(resource) {
    var promise = new Promise((resolve, reject) => {
        if (!resource) { return reject('Resource is undefined.'); }
        if (!resource.ApiName === 'GPIO') { return reject('Resource is not GPIO api accessible.'); }
        if (!validPins.includes(resource.PinNumber)) { return reject('Invalid pin number.'); }

        resolve(cacheResource(resource));
    });

    return promise;
}

function cacheResource(resource) {
    resourceCache[resource.Id] = new Pin(resource);

    return resourceCache[resource.Id];
}

function readSync(resource) {
    var promise = new Promise((resolve, reject) => {
        validate(resource)
            .then((pin) => {
                return resolve(pin.gpio.readSync());
            }).catch((err) => {
                return reject(err);
            });
    });

    return promise;
}

function read(resource, callback) {
    validate(resource)
        .then((pin) => {
            pin.gpio.read(callback);
        }).catch((err) => {
            throw new Error(err);
        });
}

function writeSync(resource, value) {
    var promise = new Promise((resolve, reject) => {
        validate(resource)
            .then((pin) => {
                return resolve(pin.gpio.writeSync(value));
            }).catch((err) => {
                return reject(err);
            });
    });

    return promise;
}

function write(resource, value, callback) {
    validate(resource)
        .then((pin) => {
            pin.gpio.write(value, callback);
        }).catch((err) => {
            throw new Error(err);
        });
}

exports.readSync = readSync;
exports.read = read;
exports.writeSync = writeSync;
exports.write = write;