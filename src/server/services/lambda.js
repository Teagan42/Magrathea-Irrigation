
function requireFromString(src, filename) {
    let promise = new Promise((resolve, reject) => {
        try {
            let m = new module.constructor();

            m.paths = module.paths;
            m._compile(src, filename);

            return resolve(m.exports);
        } catch (e) {
            return reject(e);
        }
    });

    return promise;
}

function executeLambda(script, entry, context) {
    let promise = new Promise((resolve, reject) => {
        requireFromString(script)
            .then((methods) => {
                if (!methods[entry] || typeof methods[entry] !== 'function') {
                    return reject('Entry point not found in lambda: ' + entry);
                }

                return resolve(methods[entry](context));
            }).catch((err) => {
                return reject(err);
            });
    });

    return promise;
}

exports.execute = executeLambda;
