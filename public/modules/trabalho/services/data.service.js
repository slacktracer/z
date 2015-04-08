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
            create: create,
            example: example,
            countByInscricao: countByInscricao
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
    }
}());
