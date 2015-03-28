'use strict';
(function (
    bodyParser,
    clientSessions,
    express,
    modules,
    routers,
    settings
) {
    let router = express.Router();
    module.exports = router;
    router.use(clientSessions(settings.session));
    router.use(bodyParser.json());
    router.use('/inscricao', routers.inscricao);
    router.use('/trabalho', routers.trabalho);
    router.use('/usuario', routers.usuario);
}(
    require('body-parser'),
    require('client-sessions'),
    require('express'),
    { //modules
        authorizer: require('../modules/authorizer')
    },
    { //routers
        inscricao: require('./inscricao'),
        trabalho: require('./trabalho'),
        usuario: require('./usuario')
    },
    { //settings
        session: require('../settings/session')
    }
));
