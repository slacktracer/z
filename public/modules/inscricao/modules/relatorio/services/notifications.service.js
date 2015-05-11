(function () {
    'use strict';
    angular
        .module('inscricao.relatorio')
        .service('inscricao.relatorio.notifications', notifications);
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
            databaseError: function databaseError() {
                sweetAlert({
                    title: 'Erro!',
                    text: 'Falha no Processamento dos Dados.',
                    type: 'error'
                });
            },
            loadingAll: {
                pending: function pending() {
                    sweetAlert({
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        html: true,
                        text: '<div class="spinner"></div><br>Carregando inscrições.',
                        showConfirmButton: false,
                        title: 'Aguarde!',
                        type: null
                    });
                },
                fulfilled: function fulfilled() {
                    sweetAlert.close();
                },
                rejected: function rejected() {
                    sweetAlert({
                        text: 'Não foi possível carregar as inscrições.',
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
