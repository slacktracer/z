(function () {
    'use strict';
    angular
        .module('trabalho')
        .factory('trabalho.data', data);
    data.$inject = [
        '$http',
        '$upload',
        'trabalho.example'
    ];
    function data(
        $http,
        $upload,
        example
    ) {
        var
            service;
        service = {
            isAllowedToSubmit: isAllowedToSubmit,
            countByInscricao: countByInscricao,
            create: create,
            advise: advise,
            evaluate: evaluate,
            example: example,
            readAll: readAll
        };
        return service;
        /**
         * functions
         */
        function create(trabalho, arquivo, onProgress) {
            return $upload
                .upload({
                    url: 'api/trabalho',
                    fields: {
                        trabalho: trabalho
                    },
                    file: arquivo
                })
                .progress(onProgress)
                .then(function (value) {
                    return value.data;
                })
                .catch(function (reason) {
                    return reason.data;
                });
        }
        function countByInscricao() {
            return $http
                .get('/api/trabalho/quantidade')
                .then(function onResolve(value) {
                    return value.data.quantidade;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
        function advise(id, advice) {
            return $http
                .post('/api/trabalho/recomendar', {
                    id: id,
                    advice: advice
                })
                .then(function onResolve(value) {
                    return value.data;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
        function evaluate(id, evaluation) {
            return $http
                .post('/api/trabalho/avaliar', {
                    id: id,
                    evaluation: evaluation
                })
                .then(function onResolve(value) {
                    return value.data;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
        function isAllowedToSubmit() {
            return $http
                .get('/api/trabalho/status')
                .then(function onResolve(value) {
                    return value.data.status;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
        function readAll() {
            return $http
                .get('/api/trabalho')
                .then(function onResolve(value) {
                    return value.data.trabalhos;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
    }
}());
