'use strict';
(function (
    bluebird,
    browseridVerify,
    modules,
    settings
) {
    let Promise = bluebird;
    module.exports = verify;
    function verify(assertion) {
        modules.logger.info('Verifying an assertion.');
        return new Promise(function executor(resolve, reject) {
            browseridVerify(
                assertion,
                settings.authentication.audience[settings.application.environment],
                function onVerified(error, email, response) {
                    if (error) {
                        reject(error);
                        return false;
                    }
                    if (response.status === 'failure') {
                        reject(response.reason);
                        return false;
                    }
                    modules.logger.info('Assertion verification succeded for: ' + email);
                    resolve(email);
                    return true;
                }
            );
        });
    }
}(
    require('bluebird'),
    require('browserid-verify')(),
    { //modules
        logger: require('../modules/logger')
    },
    { //settings
        application: require('../settings/application'),
        authentication: require('../settings/authentication')
    }
));
