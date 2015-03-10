(function () {
    'use strict';
    angular
        .module('main')
        .run(run);
    run.$inject = [
        '$location',
        '$rootScope',
        'session.session'
    ];
    function run(
        $location,
        $rootScope,
        session
    ) {
        var
            requestedPath;
        $rootScope.$on('$routeChangeStart', function on$routeChangeStart(event, next, current) {
            if ($location.path() !== '/') {
                requestedPath = $location.path();
                if (session.email === null) {
                    $location.path('/');
                }
                session.on('sessionSet', function onSessionSet(email) {
                    $location.path(requestedPath);
                }, true);
            }
        });
    }
}());
