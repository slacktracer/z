(function () {
    'use strict';
    angular
        .module('inscricao.relatorio')
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
            .when('/inscricao/relatorio', {
                templateUrl: 'modules/inscricao/modules/relatorio/templates/relatorio.template.html'
            });
        $routeProvider
            .when('/inscricao/relatorio/pagas', {
                controller: 'inscricao.relatorio.Pagas',
                controllerAs: 'pagas',
                templateUrl: 'modules/inscricao/modules/relatorio/templates/relatorio.pagas.template.html'
            });
        $routeProvider
            .when('/inscricao/relatorio/nao-pagas', {
                controller: 'inscricao.relatorio.NaoPagas',
                controllerAs: 'naoPagas',
                templateUrl: 'modules/inscricao/modules/relatorio/templates/relatorio.nao-pagas.template.html'
            });
        $routeProvider
            .when('/inscricao/relatorio/isentas', {
                controller: 'inscricao.relatorio.Isentas',
                controllerAs: 'isentas',
                templateUrl: 'modules/inscricao/modules/relatorio/templates/relatorio.isentas.template.html'
            });
        ngToastProvider.configure({
            additionalClasses: 'toast',
            horizontalPosition: 'center'
        });
    }
}());
