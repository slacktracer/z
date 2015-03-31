'use strict';
(function (
    modules,
    Form
) {
    let middleware = {
        denyMultiple: denyMultiple,
        denyViewOthers: denyViewOthers,
        guardEmail: guardEmail,
        guardInscricao: guardInscricao,
        parseUpload: parseUpload
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
    function guardEmail(request, response, next) {
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
    function guardInscricao(request, response, next) {
        let inscricao = request.body;
        let session = request.session;
        if (
            modules.authorizer.mayNot('MULTIPLE', session.permissions) &&
            inscricao.id !== session.inscricao
        ) {
            modules.logger.warn(`Tentativa de alteração de inscrição não autorizada. O usuário ${session.email}, associado à inscrição ${session.inscricao} tentou alterar a inscrição ${inscricao.id}`);
            inscricao.id = session.inscricao;
        }
        return next();
    }
    function parseUpload(request, response, next) {
        let form = new Form();
        form.parse(
            request,
            function onParse(
                error,
                fields,
                files
            ) {
                if (error) {
                    response
                        .status(500)
                        .send({
                            isError: true,
                            type: 'PARSE_ERROR'
                        });
                    throw error;
                }
                request.body.trabalho = JSON.parse(fields.trabalho[0]);
                request.body.trabalho.nome_do_arquivo = files.file[0].originalFilename;
                request.body.trabalho.caminho_do_arquivo = files.file[0].path;
                return next();
            }
        );
    }
}(
    { //modules
        authorizer: require('../modules/authorizer'),
        logger: require('../modules/logger')
    },
    require('multiparty').Form
));
