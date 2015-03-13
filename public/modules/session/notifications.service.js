(function () {
    'use strict';
    angular
        .module('session')
        .service('session.notifications', notifications);
    notifications.$inject = [
        'notifier.notifier'
    ];
    function notifications(
        notifier
    ) {
        var
            service;
        service = {
            authenticating: {
                pending: function pending() {
                    this.notification = notifier({
                        message: 'Processando autenticação...'
                    }, {
                        type: 'warning'
                    });
                },
                fulfilled: function fulfilled() {
                    this.notification.update('type', 'success');
                    this.notification.update('message', '<strong>Sucesso.</strong> Sua autenticação foi realizada com sucesso.');
                    notifier.close(this.notification, 1000);
                },
                rejected: function rejected() {
                    this.notification.update('type', 'danger');
                    this.notification.update('message', '<strong>Erro.</strong> Não foi possível realizar sua autenticação.');
                    notifier.close(this.notification, 10000);
                }
            },
            verifyingAuthenticationState: {
                pending: function started() {
                    this.notification = notifier({
                        message: 'Verificando autenticação...'
                    });
                },
                fulfilled: function done() {
                    this.notification.update('message', 'Autenticação verificada.');
                    notifier.close(this.notification, 1000);
                }
            }
        };
        return service;
    }
}());
