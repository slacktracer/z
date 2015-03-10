(function () {
    'use strict';
    angular
        .module('inscricao')
        .factory('inscricao.errorHandler', errorHandler);
    function errorHandler() {
        var
            surrogate = window.alert;
        return service;
        function service(error) {
            switch (error.type) {
            case 'ACCESS_DENIED':
                surrogate('ACCESS_DENIED');
                break;
            case 'CPF_REPETIDO':
                surrogate('CPF_REPETIDO');
                break;
            case 'NO_SUCH_ID':
                surrogate('NO_SUCH_ID');
                break;
            default:
                surrogate('UNCAUGHT: ' + error.type);
            }
        }
    }
}());
