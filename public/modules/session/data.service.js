(function () {
    'use strict';
    angular
        .module('session')
        .factory('session.data', data);
    data.$inject = [
        '$http'
    ];
    function data(
        $http
    ) {
        var
            service;
        service = {
            createSession: createSession,
            deleteSession: deleteSession,
            readSession: readSession
        };
        return service;
        /**
         * functions
         */
        function createSession(assertion) {
            return $http
                .post('/api/usuario/session', {
                    assertion: assertion
                })
                .then(function onResolve(value) {
                    return {
                        email: value.data.email,
                        inscricao: value.data.inscricao,
                        permissions: value.data.permissions
                    };
                });
        }
        function deleteSession() {
            return $http
                .delete('/api/usuario/session')
                .then(function onResolve(value) {
                    return {
                        email: value.data.email,
                        inscricao: value.data.inscricao,
                        permissions: value.data.permissions
                    };
                });
        }
        function readSession() {
            return $http
                .get('/api/usuario/session')
                .then(function onResolve(value) {
                    return {
                        email: value.data.email,
                        inscricao: value.data.inscricao,
                        permissions: value.data.permissions
                    };
                });
        }
    }
}());
