(function () {
    'use strict';
    angular
        .module('inscricao')
        .factory('inscricao.errorHandler', errorHandler);
    errorHandler.$inject = [
        'inscricao.notifications'
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
            case 'CPF_REPETIDO':
                notifications.cpfRepetidoError();
                break;
            case 'DATABASE':
                notifications.databaseError();
                break;
            case 'NO_SUCH_ID':
                notifications.noSuchIdError();
                break;
            case 'WEIRD_ERROR_001':
                notifications.weirdError001();
                break;
            default:
                notifications.uncaughtError(error);
            }
        }
    }
}());
