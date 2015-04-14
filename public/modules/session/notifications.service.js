(function () {
    'use strict';
    angular
        .module('session')
        .service('session.notifications', notifications);
    notifications.$inject = [
        'main.sweetAlert',
        'ngToast'
    ];
    function notifications(
        sweetAlert,
        ngToast
    ) {
        var
            service;
        service = {
            authenticating: {
                pending: function pending() {
                    this.toast = ngToast.create({
                        className: 'info',
                        content: 'Processando autenticação...',
                        dismissOnTimeout: false
                    });
                },
                fulfilled: function fulfilled() {
                    ngToast.dismiss(this.toast);
                    ngToast.create({
                        className: 'success',
                        content: '<strong>Sucesso.</strong> Sua autenticação foi realizada com sucesso.',
                        timeout: 4000
                    });
                },
                rejected: function rejected() {
                    sweetAlert({
                        text: 'Não foi possível realizar sua autenticação.',
                        title: 'Erro!',
                        type: 'error'
                    });
                }
            },
            verifyingAuthenticationState: {
                pending: function started() {
                    this.toast = ngToast.create({
                        className: 'info',
                        content: 'Verificando autenticação...',
                        dismissOnTimeout: false
                    });
                },
                fulfilled: function done() {
                    ngToast.dismiss(this.toast);
                    ngToast.create({
                        className: 'success',
                        content: '<strong>Sucesso.</strong> Autenticação verificada.',
                        timeout: 4000
                    });
                }
            }
        };
        return service;
    }
}());
