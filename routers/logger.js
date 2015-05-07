'use strict';
(function (
    express,
    modules
) {
    let router = express.Router();
    module.exports = router;
    router.post(
        '/',
        function (request, response, next) {
            modules.logger.info(modules.logger.myCustomParser(request.body));
            response.send({
                data: 'Logging request accepted. Thank you.'
            });
        }
    );
}(
    require('express'),
    { //modules
        logger: require('../modules/logger')
    }
));
