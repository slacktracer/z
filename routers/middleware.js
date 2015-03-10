'use strict';
(function (
    modules
) {
    let middleware = {
        denyMultiple: denyMultiple,
        denyViewOthers: denyViewOthers,
        protectEmail: protectEmail
    };
    module.exports = middleware;
    function denyMultiple(request, response, next) {
        let session = request.session;
        if (
            modules.authorizer.mayNot('MULTIPLE', session.permissions) &&
            session.inscricao !== null
        ) {
            response
                .status(403)
                .send({
                    error: 'Acesso Negado',
                    isError: true,
                    type: 'ACCESS_DENIED'
                });
            return;
        }
        return next();
    }
    function denyViewOthers(request, response, next) {
        let session = request.session;
        if (modules.authorizer.mayNot('VIEW_OTHERS', session.permissions)) {
            response
                .status(403)
                .send({
                    error: 'Acesso Negado',
                    isError: true,
                    type: 'ACCESS_DENIED'
                });
            return;
        }
        return next();
    }
    function protectEmail(request, response, next) {
        let inscricao = request.body;
        let session = request.session;
        if (
            modules.authorizer.mayNot('MULTIPLE', session.permissions) &&
            inscricao.email !== session.email
        ) {
            modules.logger.warn(`Tentativa de alteração de e-mail não autorizada: ${session.email} para ${inscricao.email}`);
            inscricao.email = session.email;
        }
        return next();
    }
}(
    { //modules
        authorizer: require('../modules/authorizer'),
        logger: require('../modules/logger')
    }
));
