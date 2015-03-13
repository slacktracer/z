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
            surrogateAlert,
            surrogateError;
        surrogateAlert = window.alert;
        surrogateError = window.error;
        return service;
        function service(error) {
            switch (error.type) {
            case 'ACCESS_DENIED':
                surrogateAlert('ACCESS_DENIED');
                break;
            case 'CPF_REPETIDO':
                notifications.cpfRepetido();
                break;
            case 'NO_SUCH_ID':
                surrogateAlert('NO_SUCH_ID');
                break;
            default:
                surrogateError('UNCAUGHT: ' + error.type);
            }
        }
    }
}());
