(function () {
    'use strict';
    angular
        .module('inscricao')
        .service('inscricao.notifications', notifications);
    notifications.$inject = [
        'inscricao.settings',
        'main.sweetAlert',
        'ngToast'
    ];
    function notifications(
        settings,
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
            confirmSuccess: function confirmSuccess() {
                sweetAlert({
                    text: 'Inscrição confirmada.',
                    title: 'Sucesso!',
                    type: 'success'
                });
            },
            cpfRepetidoError: function cpfRepetidoError() {
                sweetAlert({
                    title: 'Atenção!',
                    text: 'O CPF fornecido já foi usado em uma inscrição anterior.',
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
            invalid: function invalid() {
                sweetAlert({
                    text: 'Alguns campos contém valores inválidos ou são obrigatórios e não foram preenchidos. Estes campos estão destacados em vermelho. Por favor, corrija-os antes de avançar.',
                    title: 'Atenção!',
                    type: 'warning'
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
            loadingOne: {
                pending: function pending() {
                    sweetAlert({
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        html: true,
                        text: '<div class="spinner"></div><br>Carregando inscrição.',
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
            noSuchIdError: function noSuchIdError() {
                sweetAlert({
                    text: 'Registro não encontrado.',
                    title: 'Erro!',
                    type: 'error'
                });
            },
            saving: {
                pending: function pending() {
                    this.toast = ngToast.create({
                        className: 'info',
                        content: 'Salvando inscrição...',
                        dismissOnTimeout: false
                    });
                },
                fulfilled: function fulfilled() {
                    ngToast.dismiss(this.toast);
                },
                rejected: function rejected() {
                    sweetAlert({
                        text: 'Não foi possível salvar sua inscrição.',
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
            },
            vagasEsgotadas: function vagasEsgotadas(error) {
                var
                    cursos;
                cursos = [];
                error.cursos.forEach(function forEach(curso) {
                    cursos.push(settings.cursos[curso]);
                });
                if (cursos.length === 1) {
                    sweetAlert({
                        html: true,
                        text: 'O curso <b>' + cursos[0] + '</b> está com as vagas esgotadas.',
                        title: 'Erro!',
                        type: 'error'
                    });
                } else {
                    sweetAlert({
                        html: true,
                        text: 'Os cursos <b>' + cursos.join('</b> e <b>') + '</b> estão com as vagas esgotadas.',
                        title: 'Erro!',
                        type: 'error'
                    });
                }
            },
            weirdError001: function weirdError001() {
                sweetAlert({
                    text: 'Não foi possível determinar a identidade da inscrição.',
                    title: 'Erro!',
                    type: 'error'
                });
            }
        };
        return service;
    }
}());
