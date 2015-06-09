(function () {
    'use strict';
    angular
        .module('inscricao.relatorio')
        .factory('inscricao.relatorio.data', data);
    data.$inject = [
        '$http'
    ];
    function data(
        $http
    ) {
        var
            service;
        service = {
            readAllConfirmadas: readAllConfirmadas,
            readAllPagas: readAllPagas,
            readAllNaoPagas: readAllNaoPagas,
            readAllIsentas: readAllIsentas
        };
        return service;
        /**
         * functions
         */
        function readAllConfirmadas() {
            return $http
                .get('/api/inscricao/relatorio/confirmadas')
                .then(function onResolve(value) {
                    return value.data.inscricoes;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
        function readAllPagas() {
            return $http
                .get('/api/inscricao/relatorio/pagas')
                .then(function onResolve(value) {
                    return value.data.inscricoes;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
        function readAllNaoPagas() {
            return $http
                .get('/api/inscricao/relatorio/nao-pagas')
                .then(function onResolve(value) {
                    return value.data.inscricoes;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
        function readAllIsentas() {
            return $http
                .get('/api/inscricao/relatorio/isentas')
                .then(function onResolve(value) {
                    return value.data.inscricoes;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
    }
}());
