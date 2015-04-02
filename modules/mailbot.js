'use strict';
(function (
    fs,
    modules,
    nodemailer,
    settings
) {
    let transporter = nodemailer.createTransport({
        service: settings.mail.service,
        auth: {
            user: settings.mail.authentication.username,
            pass: settings.mail.authentication.password
        }
    });
    module.exports = mailbot;
    // proof of concept
    // ainda é necessário conferir as categorias e os respectivos e-mails dos responsáveis por cada categoria
    // daí enviar e-mail para o coordenador responsável e em seguida e-mail de confirmação de envio para o usuário
    // o processo tem alguns passo e é um pouco elaborado, é importante fazer o mais simples possível e bem partido em funções
    function mailbot(filePath, fileName, usuario) {
        fs.readFile(filePath, function onRead(readFileError, fileData) {
            if (readFileError) {
                throw readFileError;
            }
            let mail = {
                from: settings.mail.from,
                to: usuario,
                subject: 'Trabalho Submetido',
                text: `Testando a submissão de trabalho.`,
                attachments: [{
                    content: fileData,
                    filename: fileName
                }]
            };
            transporter.sendMail(mail, function onSent(sendMailError, info) {
                if (sendMailError) {
                    modules.logger.error(`Erro no envio de e-mail. Detalhes: ${sendMailError}`);
                    throw sendMailError;
                }
                modules.logger.info(`Envio de e-mail bem sucedido para ${usuario}. Detalhes: ${info.response}`);
            });
        });
    }
}(
    require('fs'),
    { //modules
        logger: require('./logger')
    },
    require('nodemailer'),
    { //settings
        mail: require('../settings/mail')
    }
));
