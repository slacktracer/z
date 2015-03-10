'use strict';
(function (
    modules
) {
    module.exports = errorHandler;
    function errorHandler(application) {
        if (application.get('env') === 'development') {
            application.use(function (error, request, response, next) {
                modules.logger.error(format(error, request));
                response.status(error.status || 500);
                response.send({
                    message: error.message,
                    error: error
                });
            });
        } else {
            application.use(function (error, request, response, next) {
                modules.logger.error(format(error, request));
                response.status(error.status || 500);
                response.send({
                    message: error.message,
                    error: {}
                });
            });
        }
    }
    function format(error, request) {
        let route = request.method + ' ' + request.path;
        let errorMessageWithStacktrace = error.stack;
        return errorMessageWithStacktrace + '\n' + '    on ' + route;
    }
}(
    { //modules
        logger: require('./logger')
    }
));
