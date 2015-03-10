'use strict';
(function (
    express,
    models,
    modules
) {
    let router = express.Router();
    module.exports = router;
    router.delete('/', function (request, response, next) {
        models
            .session
            .destroy(request.session)
            .then(function then(value) {
                response.send(value);
            })
            .catch(function onReject(reason) {
                if (reason.isError !== true) {
                    modules.logger.warn('Uncaught exception!');
                }
                modules.logger.error(reason);
                response
                    .status(500)
                    .send(reason);
            });
    });
    router.get('/', function (request, response, next) {
        models
            .session
            .read(request.session)
            .then(function then (value) {
                response.send(value);
            })
            .catch(function onReject(reason) {
                if (reason.isError !== true) {
                    modules.logger.warn('Uncaught exception!');
                }
                modules.logger.error(reason);
                response
                    .status(500)
                    .send(reason);
            });
    });
    router.post('/', function (request, response, next) {
        models
            .session
            .create(request.session, request.body)
            .then(function then(value) {
                response.send(value);
            })
            .catch(function onReject(reason) {
                if (reason.isError !== true) {
                    modules.logger.warn('Uncaught exception!');
                }
                modules.logger.error(reason);
                response
                    .status(500)
                    .send(reason);
            });
    });
}(
    require('express'),
    { //models
        session: require('../models/session')
    },
    { //modules
        logger: require('../modules/logger')
    }
));
