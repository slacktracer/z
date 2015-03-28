(function () {
    'use strict';
    angular
        .module('trabalho')
        .factory('trabalho.data', data);
    data.$inject = [
        '$http',
        '$q',
        '$upload',
        'trabalho.example'
    ];
    function data(
        $http,
        $q,
        $upload,
        example
    ) {
        var
            service;
        service = {
            create: create,
            example: example,
            readAll: readAll,
            readByInscricao: readByInscricao
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
                .success(function onSuccess(successData) {
                    return successData;
                })
                .error(function onError(errorData) {
                    return errorData;
                })
                .progress(onProgress);
        }
        function readAll() {
            return $http
                .get('/api/trabalho')
                .then(function onResolve(value) {
                    return value.data.inscricoes;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
        function readByInscricao(id) {
            return $http
                .get('/api/trabalho/inscricao/' + id)
                .then(function onResolve(value) {
                    return value.data;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
    }
}());
