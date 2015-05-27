'use strict';
(function (
    settings,
    winston
) {
    let logger = new winston.Logger();
    logger.add(winston.transports.Console, settings.logger.console);
    logger.add(winston.transports.Papertrail, settings.logger.papertrail);
    logger.myCustomParser = myCustomParser;
    module.exports = logger;
    /*
     * functions
     */
    function myCustomParser(requestBody) {
        if (requestBody.lg[0]) {
            return JSON.parse(requestBody.lg[0].m);
        } else {
            return JSON.parse(requestBody);
        }
    }
}(
    { //settings
        logger: require('../settings/logger')
    },
    require('winston'),
    require('winston-papertrail')
));
