'use strict';
(function (
    bluebird,
    modules,
    nodemailer
) {
    let Promise = bluebird;
    let transporter = nodemailer.createTransport({
        service: `Gmail`,
        auth: {
            user: `congressohujbb2015@gmail.com`,
            pass: `hujbb2016`
        }
    });
    let sendMail = Promise.promisify(transporter.sendMail, transporter);
    let notifications = {
        confirmation: confirmation
    };
    module.exports = notifications;
    /*
     * functions
     */
    function confirmation(email) {
        sendMail({
            from: `Secretaria do V Congresso do Hospital Universitário João de Barros Barreto <trabalhos.hujbb@gmail.com>`,
            to: email,
            subject: `Confirmação de Inscrição - Congresso HUJBB`,
            html: `Prezado(a),` +
                `<br><br>` +
                `Agradecemos o envio do comprovante de pagamento. Sua inscrição está confirmada.` +
                `<br><br>` +
                `Cordialmente,` +
                `<br>` +
                `Zana Ribeiro` +
                `<br>` +
                `Secretaria do V Congresso do Hospital Universitário João de Barros Barreto` +
                `<br>` +
                `Trav. Lomas Valentinas, 1525. Sala 02. Marco. Belém, PA. CEP: 66093670.` +
                `<br>` +
                `Tel: 91 3228 4893 | www.congressohujbb.com.br`
        })
        .then(function onResolve(value) {
            modules.logger.info(`E-mail de confirmação de inscrição enviado para ${email}.`);
        })
        .catch(function onReject(reason) {
            modules.logger.error(`Erro no envio de e-mail de confirmação de inscrição para ${email}. Detalhes: ${JSON.stringify(reason)}`);
        });
    }
}(
    require('bluebird'),
    { //modules
        logger: require('./logger')
    },
    require('nodemailer')
));
