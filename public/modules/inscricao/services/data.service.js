(function () {
    'use strict';
    angular
        .module('inscricao')
        .factory('inscricao.data', data);
    data.$inject = [
        '$http',
        '$q',
        'inscricao.example'
    ];
    function data(
        $http,
        $q,
        example
    ) {
        var
            service;
        service = {
            create: create,
            example: example,
            readAll: readAll,
            readById: readById,
            readStatusById: readStatusById,
            update: update
        };
        return service;
        /**
         * functions
         */
        function create(inscricao) {
            return $http
                .post('/api/inscricao', inscricao)
                .then(function onResolve(value) {
                    return value.data.id;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
        function readAll() {
            return $http
                .get('/api/inscricao')
                .then(function onResolve(value) {
                    return value.data.inscricoes;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
        function readById(id) {
            return $http
                .get('/api/inscricao/' + id)
                .then(function onResolve(value) {
                    return value.data.inscricao;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
        function readStatusById(id) {
            return $http
                .get('/api/inscricao/' + id + '/status')
                .then(function onResolve(value) {
                    return value.data.status;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
        function update(inscricao) {
            return $http
                .put('/api/inscricao/', inscricao)
                .then(function onResolve(value) {
                    return value.data;
                })
                .catch(function onReject(reason) {
                    return reason.data;
                });
        }
    }
}());
