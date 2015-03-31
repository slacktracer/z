(function () {
    'use strict';
    angular
        .module('trabalho')
        .service('trabalho.notifications', notifications);
    notifications.$inject = [
        'notifier.notifier'
    ];
    function notifications(
        notifier
    ) {
        var
            service;
        service = {
            invalid: function invalid() {
                notifier({
                    message: '<strong>Atenção!</strong> Alguns campos contém valores inválidos ou são obrigatórios e não foram preenchidos. Estes campos estão destacados em vermelho. Por favor, corrija-os antes de salvar.'
                }, {
                    delay: 20000,
                    type: 'danger'
                });
            },
            loadingCount: {
                pending: function pending() {
                    this.notification = notifier({
                        message: 'Verificando submissões...'
                    });
                },
                fulfilled: function fulfilled() {
                    this.notification.update('type', 'success');
                    this.notification.update('message', '<strong>Sucesso.</strong> Submissões verificadas.');
                    notifier.close(this.notification, 3000);
                },
                rejected: function rejected() {
                    this.notification.update('type', 'danger');
                    this.notification.update('message', '<strong>Erro.</strong> Não foi possível verificar suas submissões.');
                    notifier.close(this.notification, 10000);
                }
            },
            sending: {
                pending: function pending() {
                    this.notification = notifier({
                        message: 'Enviando trabalho...'
                    }, {
                        type: 'warning'
                    });
                },
                fulfilled: function fulfilled() {
                    this.notification.update('type', 'success');
                    this.notification.update('message', '<strong>Sucesso.</strong> Seu trabalho foi enviado com sucesso.');
                    notifier.close(this.notification, 3000);
                },
                rejected: function rejected() {
                    this.notification.update('type', 'danger');
                    this.notification.update('message', '<strong>Erro.</strong> Não foi possível enviar seu trabalho.');
                    notifier.close(this.notification, 10000);
                }
            }
        };
        return service;
    }
}());
