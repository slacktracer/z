'use strict';
(function (
    express,
    middleware,
    models,
    modules
) {
    let router = express.Router();
    module.exports = router;
    router.get('/:id', function (request, response, next) {
        models
            .inscricao
            .readById(request.params.id)
            .then(function then(inscricao) {
                response.send({
                    inscricao: inscricao
                });
            })
            .catch(function (reason) {
                if (reason.isError !== true) {
                    modules.logger.warn('Uncaught exception!');
                }
                modules.logger.error(reason);
                response
                    .status(500)
                    .send(reason);
            });
    });
    router.get('/:id/status', function (request, response, next) {
        models
            .inscricao
            .readStatusById(request.params.id)
            .then(function then(status) {
                response.send({
                    status: status
                });
            })
            .catch(function (reason) {
                if (reason.isError !== true) {
                    modules.logger.warn('Uncaught exception!');
                }
                modules.logger.error(reason);
                response
                    .status(500)
                    .send(reason);
            });
    });
    router.get(
        '/',
        middleware.denyViewOthers,
        function (request, response, next) {
            models
                .inscricao
                .readAll()
                .then(function then(inscricoes) {
                    response.send({
                        inscricoes: inscricoes
                    });
                })
                .catch(function (reason) {
                    if (reason.isError !== true) {
                        modules.logger.warn('Uncaught exception!');
                    }
                    modules.logger.error(reason);
                    response
                        .status(500)
                        .send(reason);
                });
        }
    );
    router.post(
        '/',
        middleware.denyMultiple,
        middleware.protectEmail,
        function (request, response, next) {
            models
                .inscricao
                .create(request.body, request.session.email)
                .then(function then(id) {
                    request.session.inscricao = id;
                    response.send({
                        id: id
                    });
                })
                .catch(function (reason) {
                    if (reason.isError !== true) {
                        modules.logger.warn('Uncaught exception!');
                    }
                    modules.logger.error(reason);
                    response
                        .status(500)
                        .send(reason);
                });
        }
    );
    router.put('/', function (request, response, next) {
        models
            .inscricao
            .update(request.body, request.session.email)
            .then(function then(id) {
                request.session.inscricao = id;
                response
                    .status(204)
                    .send({});
            })
            .catch(function (reason) {
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
    { //middleware
        denyMultiple: require('./middleware').denyMultiple,
        denyViewOthers: require('./middleware').denyViewOthers,
        protectEmail: require('./middleware').protectEmail
    },
    { //models
        inscricao: require('../models/inscricao')
    },
    { //modules
        logger: require('../modules/logger')
    }
));
