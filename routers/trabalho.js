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
                    request.body.value
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
        parseUpload: require('./middleware').parseUpload
    },
    { //models
        trabalho: require('../models/trabalho')
    },
    { //modules
        logger: require('../modules/logger')
    }
));
