'use strict';
(function (
    compression,
    express,
    modules,
    morgan,
    serveFavicon,
    serveStatic
) {
    module.exports = applicationStarter;
    function applicationStarter(settings) {
        let application = express();
        application.use(compression());
        application.use(morgan('dev', {
            skip: function skip(request, response) {
                return (
                    response.statusCode > 199 &&
                    response.statusCode < 400
                );
            }
        }));
        application.use(serveFavicon(settings.serveFaviconPath));
        application.use(serveStatic(settings.serveStaticPath));
        settings.routing(application);
        application.get('*', function (request, response) {
            response.sendFile(settings.indexPath);
        });
        settings.errorHandler(application);
        let server = application.listen(
            settings.developmentPort,
            function onListening() {
                modules.logger.info(settings.onListeningMessage, server.address().port);
                settings.setEnvironment(application.settings.env);
            }
        );
        return application;
    }
}(
    require('compression'),
    require('express'),
    { //modules
        logger: require('./logger')
    },
    require('morgan'),
    require('serve-favicon'),
    require('serve-static')
));
