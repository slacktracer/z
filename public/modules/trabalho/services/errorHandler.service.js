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
        var
            surrogateAlert;
        surrogateAlert = window.alert;
        return service;
        function service(error) {
            switch (error.type) {
            case 'ACCESS_DENIED':
                surrogateAlert('ACCESS_DENIED');
                break;
            case 'NO_SUCH_ID':
                surrogateAlert('NO_SUCH_ID');
                break;
            case 'INVALID_FILETYPE':
                surrogateAlert('INVALID_FILETYPE');
                break;
            default:
                surrogateAlert('UNCAUGHT: ' + error.type);
            }
        }
    }
}());
