'use strict';
(function (
    express,
    middleware,
    models,
    modules
) {
    let router = express.Router();
    module.exports = router;
    router.post(
        '/',
        middleware.parseUpload,
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
}(
    require('express'),
    { //middleware
        parseUpload: require('./middleware').parseUpload
    },
    { //models
        trabalho: require('../models/trabalho')
    },
    { //modules
        logger: require('../modules/logger')
    }
));
