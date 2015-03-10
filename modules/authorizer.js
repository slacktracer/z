'use strict';
(function (
    settings
) {
    let authorizer = {
        may: may,
        mayNot: mayNot
    };
    module.exports = authorizer;
    function may(action, permissions) {
        if (permissions) {
            return (permissions.indexOf(action) !== -1);
        }
        return false;
    }
    function mayNot(action, permissions) {
        if (permissions) {
            return (permissions.indexOf(action) === -1);
        }
        return true;
    }
}(
    { //settings
        permissions: require('../settings/permissions')
    }
));
