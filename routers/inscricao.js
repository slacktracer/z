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
        middleware.guardEmail,
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
    router.post(
        '/:id/confirmar',
        middleware.denyConfirm,
        function (request, response, next) {
            models
                .inscricao
                .confirm(request.body)
                .then(function then() {
                    response.send({
                        inscricao: request.body
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
    router.put(
        '/',
        middleware.guardInscricao,
        function (request, response, next) {
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
        }
    );
    router.get(
        '/relatorio/pagas',
        middleware.denyViewOthers,
        function (request, response, next) {
            models
                .inscricao
                .readAllPagas()
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
    router.get(
        '/relatorio/nao-pagas',
        middleware.denyViewOthers,
        function (request, response, next) {
            models
                .inscricao
                .readAllNaoPagas()
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
    router.get(
        '/relatorio/isentas',
        middleware.denyViewOthers,
        function (request, response, next) {
            models
                .inscricao
                .readAllIsentas()
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
}(
    require('express'),
    { //middleware
        denyConfirm: require('./middleware').denyConfirm,
        denyMultiple: require('./middleware').denyMultiple,
        denyViewOthers: require('./middleware').denyViewOthers,
        guardEmail: require('./middleware').guardEmail,
        guardInscricao: require('./middleware').guardInscricao,
    },
    { //models
        inscricao: require('../models/inscricao')
    },
    { //modules
        logger: require('../modules/logger')
    }
));
