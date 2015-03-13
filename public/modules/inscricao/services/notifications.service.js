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
            cpfRepetido: function cpfRepetido() {
                notifier({
                    message: '<strong>Erro.</strong> O CPF informado já foi usado em uma inscrição. Confirme o número e entre em contato com o administrador do sistema.'
                }, {
                    delay: 20000,
                    type: 'danger'
                });
            },
            invalid: function invalid() {
                notifier({
                    message: '<strong>Atenção!</strong> Alguns campos contém valores inválidos ou são obrigatórios e não foram preenchidos. Estes campos estão destacados em vermelho. Por favor, corrija-os antes de salvar.'
                }, {
                    delay: 20000,
                    type: 'danger'
                });
            },
            loadingAll: {
                pending: function pending() {
                    this.notification = notifier({
                        message: 'Carregando inscrições...'
                    });
                },
                fulfilled: function fulfilled() {
                    notifier.close(this.notification, 1000);
                },
                rejected: function rejected() {
                    this.notification.update('type', 'danger');
                    this.notification.update('message', '<strong>Erro.</strong> Não foi possível carregar as inscrições.');
                    notifier.close(this.notification, 10000);
                }
            },
            loadingOne: {
                pending: function pending() {
                    this.notification = notifier({
                        message: 'Carregando inscrição...'
                    });
                },
                fulfilled: function fulfilled() {
                    notifier.close(this.notification, 1000);
                },
                rejected: function rejected() {
                    this.notification.update('type', 'danger');
                    this.notification.update('message', '<strong>Erro.</strong> Não foi possível carregar sua inscrição.');
                    notifier.close(this.notification, 10000);
                }
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
            }
        };
        return service;
    }
}());
