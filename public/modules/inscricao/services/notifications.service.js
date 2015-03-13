(function () {
    'use strict';
    angular
        .module('inscricao')
        .service('inscricao.notifications', notifications);
    notifications.$inject = [
        'notifier.notifier'
    ];
    function notifications(
        notifier
    ) {
        var
            service;
        service = {
            invalid: function started() {
                notifier({
                    message: '<strong>Atenção!</strong> Alguns campos contém valores inválidos ou são obrigatórios e não foram preenchidos. Estes campos estão destacados em vermelho. Por favor, corrija-os antes de salvar.'
                }, {
                    delay: 20000,
                    type: 'danger'
                });
            },
            saving: {
                pending: function pending() {
                    this.notification = notifier({
                        message: 'Salvando inscrição...'
                    }, {
                        type: 'warning'
                    });
                },
                fulfilled: function fulfilled() {
                    this.notification.update('type', 'success');
                    this.notification.update('message', '<strong>Sucesso.</strong> Sua inscrição foi salva com sucesso.');
                    notifier.close(this.notification, 1000);
                },
                rejected: function rejected() {
                    this.notification.update('type', 'danger');
                    this.notification.update('message', '<strong>Erro.</strong> Não foi possível salvar sua inscrição.');
                    notifier.close(this.notification, 10000);
                }
            },
            validating: {
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
