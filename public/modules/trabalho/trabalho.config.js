(function () {
    'use strict';
    angular
        .module('trabalho')
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
            .when('/trabalho', {
                controller: 'trabalho.List',
                controllerAs: 'list',
                templateUrl: 'modules/trabalho/templates/list.template.html'
            })
            .when('/trabalho/enviar', {
                controller: 'trabalho.Edit',
                controllerAs: 'edit',
                templateUrl: 'modules/trabalho/templates/edit.template.html'
            });
    }
}());
