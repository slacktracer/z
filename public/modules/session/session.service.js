(function () {
    'use strict';
    angular
        .module('session')
        .factory('session.session', session);
    session.$inject = [
        '$location',
        'main.observed',
        'session.data',
        'session.navigator'
    ];
    function session(
        $location,
        main$observed,
        data,
        navigator
    ) {
        var
            intent,
            observed,
            service;
        observed = main$observed([
            'sessionSet'
        ]);
        service = {
            attach: attach,
            email: null,
            getState: getState,
            inscricao: null,
            may: may,
            mayNot: mayNot,
            on: observed.on,
            permissions: [],
            renew: renew,
            setup: setup
        };
        service.setup();
        return service;
        /**
         * functions
         */
        function attach(vm) {
            vm.session = service;
        }
        function followIntent() {
            switch (intent) {
            case 'INSCRICAO':
                $location.path(
                    (service.inscricao !== null) ?
                        '/inscricao/' + service.inscricao : '/inscricao/nova'
                );
                break;
            case 'NOVA':
                $location.path(
                    (service.inscricao === null) ?
                        '/inscricao/nova' : '/inscricao/' + service.inscricao
                );
                break;
            default:
                $location.path('/');
            }
            intent = null;
        }
        function getState() {
            if (
                service.email !== null &&
                service.inscricao !== null
            ) {
                return 'usuarioInscrito';
            }
            if (
                service.email !== null &&
                service.inscricao === null
            ) {
                return 'usuarioSemInscricao';
            }
            if (
                service.email === null
            ) {
                return 'usuarioNulo';
            }
        }
        function load(sessionToLoad, value) {
            sessionToLoad.email = value.email;
            sessionToLoad.inscricao = value.inscricao;
            sessionToLoad.permissions = value.permissions;
            observed.raise('sessionSet', value.email);
            return sessionToLoad;
        }
        function may(action) {
            if (service.permissions) {
                return (service.permissions.indexOf(action) !== -1);
            }
            return false;
        }
        function mayNot(action) {
            if (service.permissions) {
                return (service.permissions.indexOf(action) === -1);
            }
            return true;
        }
        function onlogin(assertion) {
            data
                .createSession(assertion)
                .then(function onResolve(value) {
                    load(service, value);
                    followIntent();
                })
                .catch(function onReject(reason) {
                    navigator.id.logout();
                    throw reason;
                });
        }
        function onlogout() {
            data
                .deleteSession()
                .then(function onResolve(value) {
                    load(service, value);
                    $location.path('/');
                })
                .catch(function onReject(reason) {
                    throw reason;
                });
        }
        function renew() {
            data
                .readSession()
                .then(function onResolve(value) {
                    load(service, value);
                });
        }
        function setup() {
            data
                .readSession()
                .then(function onResolve(value) {
                    load(service, value);
                    service.signIn = signIn;
                    service.signOut = signOut;
                    navigator.id.watch({
                        loggedInUser: service.email,
                        onlogin: onlogin,
                        onlogout: onlogout
                    });
                });
        }
        function signIn(signInIntent) {
            if (signInIntent) {
                intent = signInIntent;
            }
            navigator.id.request();
        }
        function signOut() {
            navigator.id.logout();
        }
    }
}());
