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
                    request.body.arquivo,
                    request.session.inscricao
                )
                .then(function then(value) {
                    request.session.trabalhos.push(value.id);
                    response.send({
                        id: value.id,
                        nome_do_arquivo: value.nome_do_arquivo
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
    router.get('/inscricao/:id', function (request, response, next) {
            models
                .trabalho
                .readByInscricao(request.session.inscricao)
                .then(function then(value) {
                    response.send(value);
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
