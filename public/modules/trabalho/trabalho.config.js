(function () {
    'use strict';
    angular
        .module('trabalho')
        .config(config);
    config.$inject = [
        '$locationProvider',
        '$routeProvider',
        'ngToastProvider'
    ];
    function config(
        $locationProvider,
        $routeProvider,
        ngToastProvider
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
        ngToastProvider.configure({
            additionalClasses: 'toast',
            horizontalPosition: 'center'
        });
    }
}());
