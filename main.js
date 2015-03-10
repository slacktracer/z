'use strict';
(function (
    modules,
    path,
    routers,
    settings
) {
    modules.logger.info('Warming Up!');
    modules.application({
        developmentPort: settings.application.developmentPort,
        errorHandler: modules.errorHandler,
        indexPath: path.join(__dirname, settings.application.indexPath),
        onListeningMessage: settings.application.onListeningMessage,
        routing: routing,
        serveFaviconPath: path.join(__dirname, settings.application.faviconPath),
        serveStaticPath: path.join(__dirname, settings.application.staticPath),
        setEnvironment: setEnvironment
    });
    function routing(application) {
        application.use('/api', routers.api);
        return;
    }
    function setEnvironment(environment) {
        settings.application.environment = environment;
        modules.logger.info(settings.application.onEnvironmentSetMessage, environment);
        return;
    }
}(
    { //modules
        application: require('./modules/application'),
        errorHandler: require('./modules/errorHandler'),
        logger: require('./modules/logger')
    },
    require('path'),
    { //routers
        api: require('./routers/api')
    },
    { //settings
        application: require('./settings/application')
    }
));
