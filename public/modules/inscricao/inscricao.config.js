(function () {
    'use strict';
    angular
        .module('inscricao')
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
            .when('/inscricao', {
                controller: 'inscricao.List',
                controllerAs: 'list',
                templateUrl: 'modules/inscricao/templates/list.template.html'
            })
            .when('/inscricao/nova', {
                controller: 'inscricao.Edit',
                controllerAs: 'edit',
                resolve: {
                    action: function action() {
                        return 'nova';
                    }
                },
                templateUrl: 'modules/inscricao/templates/edit.template.html'
            })
            .when('/inscricao/:id', {
                controller: 'inscricao.View',
                controllerAs: 'view',
                templateUrl: 'modules/inscricao/templates/view.template.html'
            })
            .when('/inscricao/:id/editar', {
                controller: 'inscricao.Edit',
                controllerAs: 'edit',
                resolve: {
                    action: function action() {
                        return 'editar';
                    }
                },
                templateUrl: 'modules/inscricao/templates/edit.template.html'
            });
        ngToastProvider.configure({
            additionalClasses: 'toast',
            horizontalPosition: 'center'
        });
    }
}());
