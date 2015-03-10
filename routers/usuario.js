'use strict';
(function (
    express,
    routers
) {
    let router = express.Router();
    module.exports = router;
    router.use('/session', routers.session);
}(
    require('express'),
    { //routers
        session: require('./session')
    }
));
