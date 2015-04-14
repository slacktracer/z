(function () {
    'use strict';
    angular
        .module('trabalho')
        .factory('trabalho.errorHandler', errorHandler);
    errorHandler.$inject = [
        'trabalho.notifications'
    ];
    function errorHandler(
        notifications
    ) {
        return service;
        function service(error) {
            switch (error.type) {
            case 'ACCESS_DENIED':
                notifications.accessDeniedError();
                break;
            case 'NO_SUCH_ID':
                notifications.noSuchIdError();
                break;
            case 'INVALID_FILETYPE':
                notifications.invalidFiletypeError(error);
                break;
            default:
                notifications.uncaughtError(error);
            }
        }
    }
}());
