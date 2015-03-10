'use strict';
(function (
    settings,
    winston
) {
    let logger = new winston.Logger();
    logger.add(winston.transports.Console, settings.logger.console);
    logger.add(winston.transports.Papertrail, settings.logger.papertrail);
    module.exports = logger;
}(
    { //settings
        logger: require('../settings/logger')
    },
    require('winston'),
    require('winston-papertrail')
));
