(function () {
    'use strict';
    angular
        .module('main')
        .config(config);
    config.$inject = [
        '$locationProvider',
        '$routeProvider'
    ];
    function config(
        $locationProvider,
        $routeProvider
    ) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .otherwise({
                templateUrl: 'modules/main/main.template.html'
            });
    }
}());
