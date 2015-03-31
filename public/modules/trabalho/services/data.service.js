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
                .success(function onSuccess(successData) {
                    return successData;
                })
                .error(function onError(errorData) {
                    return errorData;
                })
                .progress(onProgress);
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
    }
}());
