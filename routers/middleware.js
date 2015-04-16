'use strict';
(function (
    modules,
    Form,
    settings
) {
    let middleware = {
        denyConfirm: denyConfirm,
        denyMultiple: denyMultiple,
        denyEvaluate: denyEvaluate,
        denyViewOthers: denyViewOthers,
        denyViewPapers: denyViewPapers,
        denyUpload: denyUpload,
        guardEmail: guardEmail,
        guardInscricao: guardInscricao,
        parseUpload: parseUpload
    };
    module.exports = middleware;
    function denyConfirm(request, response, next) {
        let session = request.session;
        if (modules.authorizer.mayNot('CONFIRM', session.permissions)) {
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
    function denyEvaluate(request, response, next) {
        let session = request.session;
        if (modules.authorizer.mayNot('EVALUATE', session.permissions)) {
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
    function denyUpload(request, response, next) {
        let allowedFiletypes = settings.submission.allowedFiletypes;
        if (allowedFiletypes.indexOf(request.body.trabalho.tipo_do_arquivo) !== -1) {
            next();
        } else {
            modules.logger.warn(`Tentativa de submissão de trabalho em formato incorreto. (${request.body.trabalho.tipo_do_arquivo})`)
            response
                .status(500)
                .send({
                    error: 'Arquivo Inválido',
                    isError: true,
                    type: 'INVALID_FILETYPE'
                });
        }
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
    function denyViewPapers(request, response, next) {
        let session = request.session;
        if (modules.authorizer.mayNot('VIEW_PAPERS', session.permissions)) {
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
                request.body.trabalho.tipo_do_arquivo = files.file[0].headers['content-type'];
                return next();
            }
        );
    }
}(
    { //modules
        authorizer: require('../modules/authorizer'),
        logger: require('../modules/logger')
    },
    require('multiparty').Form,
    { //settings
        submission: require('../settings/submission')
    }
));
