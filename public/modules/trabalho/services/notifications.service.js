(function () {
    'use strict';
    angular
        .module('trabalho')
        .service('trabalho.notifications', notifications);
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
            accessDeniedError: function accessDeniedError() {
                sweetAlert({
                    text: 'Acesso Negado.',
                    title: 'Erro!',
                    type: 'error'
                });
            },
            invalid: function invalid() {
                sweetAlert({
                    text: 'Alguns campos contém valores inválidos ou são obrigatórios e não foram preenchidos. Estes campos estão destacados em vermelho. Por favor, corrija-os antes de avançar.',
                    title: 'Atenção!',
                    type: 'warning'
                });
            },
            loadingCount: {
                pending: function pending() {
                },
                fulfilled: function fulfilled() {
                },
                rejected: function rejected() {
                    sweetAlert({
                        text: 'Não foi possível verificar suas submissões prévias e liberar o sistema de submissão.',
                        title: 'Erro!',
                        type: 'error'
                    });
                }
            },
            noSuchIdError: function noSuchIdError() {
                sweetAlert({
                    text: 'Registro não encontrado.',
                    title: 'Erro!',
                    type: 'error'
                });
            },
            sending: {
                pending: function pending() {
                    this.toast = ngToast.create({
                        className: 'info',
                        content: 'Enviando trabalho...',
                        dismissOnTimeout: false
                    });
                },
                fulfilled: function fulfilled() {
                    ngToast.dismiss(this.toast);
                    this.toast = ngToast.create({
                        className: 'successo',
                        content: '<strong>Sucesso.</strong> Seu trabalho foi enviado com sucesso.',
                        timeout: 10000
                    });
                },
                rejected: function rejected() {
                    sweetAlert({
                        text: 'Não foi possível enviar seu trabalho.',
                        title: 'Erro!',
                        type: 'error'
                    });
                }
            },
            verifyingAllowed: {
                pending: function pending() {
                },
                fulfilled: function fulfilled() {
                },
                rejected: function rejected() {
                    sweetAlert({
                        text: 'Não foi possível verificar o status de sua inscrição e liberar o sistema de submissão.',
                        title: 'Erro!',
                        type: 'error'
                    });
                }
            },
            uncaughtError: function uncaughtError(error) {
                sweetAlert({
                    text: 'Uncaught: ' + error.type,
                    title: 'Erro!',
                    type: 'error'
                });
            }
        };
        return service;
    }
}());
