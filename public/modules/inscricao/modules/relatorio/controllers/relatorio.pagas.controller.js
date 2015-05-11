(function () {
    'use strict';
    angular
        .module('inscricao.relatorio')
        .controller('inscricao.relatorio.Pagas', Pagas);
    Pagas.$inject = [
        'inscricao.relatorio.data',
        'inscricao.relatorio.errorHandler',
        'inscricao.relatorio.notifications'
    ];
    function Pagas(
        data,
        errorHandler,
        notifications
    ) {
        var
            vm;
        vm = this;
        vm.calcularArrecadacao = calcularArrecadacao;
        activate();
        /**
         * functions
         */
        function activate() {
            vm.state = 'pending';
            notifications.loadingAll.pending();
            data
                .readAllPagas()
                .then(function onResolve(inscricoes) {
                    if (inscricoes.isError) {
                        throw inscricoes;
                    }
                    notifications.loadingAll.fulfilled();
                    vm.inscricoes = inscricoes;
                    vm.state = 'fulfilled';
                })
                .catch(function onReject(reason) {
                    notifications.loadingAll.rejected();
                    errorHandler(reason);
                    vm.state = 'rejected';
                });
        }
        function calcularArrecadacao() {
            var
                arrecadacao;
            arrecadacao = vm.inscricoes.reduce(function reduce(previousValue, currentValue, index) {
                if (index === 1) {
                    previousValue = previousValue.valor_pago;
                }
                return previousValue + currentValue.valor_pago;
            });
            return arrecadacao;
        }
    }
}());
