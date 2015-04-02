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
        var
            surrogateAlert;
        surrogateAlert = window.alert;
        return service;
        function service(error) {
            switch (error.type) {
            case 'ACCESS_DENIED':
                surrogateAlert('ERROR: ACCESS_DENIED');
                break;
            case 'CPF_REPETIDO':
                notifications.cpfRepetido();
                break;
            case 'DATABASE':
                surrogateAlert('ERROR: DATABASE');
                break;
            case 'NO_SUCH_ID':
                surrogateAlert('ERROR: NO_SUCH_ID');
                break;
            default:
                surrogateAlert('[UNCAUGHT] ERROR: ' + error.type);
            }
        }
    }
}());
