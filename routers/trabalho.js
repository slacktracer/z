'use strict';
(function (
    express,
    middleware,
    models,
    modules
) {
    let router = express.Router();
    module.exports = router;
    router.get(
        '/',
        middleware.denyViewPapers,
        function (request, response, next) {
            models
                .trabalho
                .readAll()
                .then(function then(trabalhos) {
                    response.send({
                        trabalhos: trabalhos
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
        middleware.submissionsEnded,
        middleware.parseUpload,
        middleware.denyUpload,
        function (request, response, next) {
            models
                .trabalho
                .create(
                    request.body.trabalho,
                    request.session.inscricao,
                    request.session.email
                )
                .then(function then(id) {
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
        '/avaliar',
        middleware.denyEvaluate,
        function (request, response, next) {
            models
                .trabalho
                .evaluate(
                    request.body.id,
                    request.body.evaluation,
                    request.session.email,
                    modules.authorizer.may('SUPERUSER', request.session.permissions)
                )
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
        }
    );
    router.post(
        '/recomendar',
        middleware.denyEvaluate,
        function (request, response, next) {
            models
                .trabalho
                .advise(
                    request.body.id,
                    request.body.advice,
                    request.session.email,
                    modules.authorizer.may('SUPERUSER', request.session.permissions)
                )
                .then(function then(advice) {
                    response.send({
                        advice: advice
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
        '/quantidade',
        function (request, response, next) {
            models
                .trabalho
                .countByInscricao(request.session.inscricao)
                .then(function then(quantidade) {
                    response.send({
                        quantidade: quantidade
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
        '/status',
        function (request, response, next) {
            models
                .trabalho
                .isAllowedToSubmit(request.session.inscricao)
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
        }
    );
}(
    require('express'),
    { //middleware
        denyUpload: require('./middleware').denyUpload,
        denyEvaluate: require('./middleware').denyEvaluate,
        denyViewPapers: require('./middleware').denyViewPapers,
        parseUpload: require('./middleware').parseUpload,
        submissionsEnded: require('./middleware').submissionsEnded,
    },
    { //models
        trabalho: require('../models/trabalho')
    },
    { //modules
        authorizer: require('../modules/authorizer'),
        logger: require('../modules/logger')
    }
));
