'use strict';
(function (
    bluebird,
    fs,
    modules,
    nodemailer,
    settings
) {
    let Promise = bluebird;
    Promise.promisifyAll(fs);
    let transporter = nodemailer.createTransport({
        service: settings.mail.service,
        auth: {
            user: settings.mail.authentication.username,
            pass: settings.mail.authentication.password
        }
    });
    let sendMail = Promise.promisify(transporter.sendMail, transporter);
    module.exports = mailbot;
    function mailbot(
        codigoDaAreaTematicaDoTrabalho,
        filePath,
        fileName,
        tituloDoTrabalho,
        codigoDoTipoDeResumo,
        usuario
    ) {
        fs
            .readFileAsync(filePath)
            .then(function onResolve(fileData) {
                let areaTematica = settings.submission.areaTematicaPorCodigo[codigoDaAreaTematicaDoTrabalho];
                let tipoDeResumo = settings.submission.tipoDeResumoPorCodigo[codigoDoTipoDeResumo];
                let attachments = [{
                    content: fileData,
                    filename: fileName
                }];
                let coordenador = settings.submission.coordenadorPorAreaTematica[
                    settings.submission.areaTematicaPorCodigo.X
                ];
                sendMail({
                    from: settings.mail.from,
                    to: `${coordenador.nome} <${coordenador.endereco}>, trabalhos.hujbb@gmail.com`,
                    subject: `Submissão de Trabalho para o Congresso HUJBB - ${areaTematica}`,
                    html: `Trabalho submetido para a área temática <b>${areaTematica}</b>` +
                        `<br><br>` +
                        `Título: <b>${tituloDoTrabalho}</b>` +
                        `<br>` +
                        `Tipo de Resumo: <b>${tipoDeResumo}</b>`,
                    attachments: attachments
                })
                .then(function onResolve(outerValue) {
                    modules.logger.info(`Envio de e-mail bem sucedido para o coordenador ${coordenador.nome}.`);
                    sendMail({
                        from: settings.mail.from,
                        to: usuario,
                        subject: 'Sucesso na Submissão de Trabalho para o Congresso HUJBB',
                        html: `Seu trabalho foi enviado com sucesso. Obrigado.` +
                            `<br><br>` +
                            `Título: <b>${tituloDoTrabalho}</b>` +
                            `<br>` +
                            `Tipo de Resumo: <b>${tipoDeResumo}</b>` +
                            `<br>` +
                            `Área Temática: <b>${areaTematica}</b>`
                    })
                    .then(function onResolve(innerValue) {
                        modules.logger.info(`Envio de e-mail bem sucedido para o usário ${usuario}.`);
                    })
                    .catch(function onReject(reason) {
                        modules.logger.error(`Erro no envio de e-mail para o usuário ${usuario}. Detalhes: ${JSON.stringify(reason)}`);
                    });
                })
                .catch(function onReject(reason) {
                    modules.logger.error(`Erro no envio de e-mail para o coordenador ${coordenador.nome}. Detalhes: ${JSON.stringify(reason)}`);
                });
            });
    }
}(
    require('bluebird'),
    require('fs'),
    { //modules
        logger: require('./logger')
    },
    require('nodemailer'),
    { //settings
        mail: require('../settings/mail'),
        submission: require('../settings/submission')
    }
));
