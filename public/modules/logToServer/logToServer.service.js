(function () {
    'use strict';
    angular
        .module('logToServer')
        .factory('logToServer.logToServer', logToServer);
    logToServer.$inject = [
        'logToServer.jsnlog',
        'session.session'
    ];
    function logToServer(
        jsnlog,
        session
    ) {
        var
            service;
        service = {
            debug: debug,
            error: error,
            info: info,
            log: log,
            warn: warn
        };
        jsnlog.setOptions({
            'defaultAjaxUrl': '/api/logger'
        });
        return service;
        /*
         * functions
         */
        function debug(data) {
            data.session = {};
            data.session.email = session.email;
            data.session.inscricao = session.inscricao;
            jsnlog().debug(data);
        }
        function error(data) {
            data.session = {};
            data.session.email = session.email;
            data.session.inscricao = session.inscricao;
            jsnlog().error(data);
        }
        function info(data) {
            data.session = {};
            data.session.email = session.email;
            data.session.inscricao = session.inscricao;
            jsnlog().info(data);
        }
        function log(data) {
            data.session = {};
            data.session.email = session.email;
            data.session.inscricao = session.inscricao;
            jsnlog().trace(data);
        }
        function warn(data) {
            data.session = {};
            data.session.email = session.email;
            data.session.inscricao = session.inscricao;
            jsnlog().warn(data);
        }
    }
}());
