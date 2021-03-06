(function () {
    'use strict';
    angular
        .module('inscricao.relatorio')
        .controller('inscricao.relatorio.Confirmadas', Confirmadas);
    Confirmadas.$inject = [
        'inscricao.relatorio.data',
        'inscricao.relatorio.errorHandler',
        'inscricao.relatorio.notifications'
    ];
    function Confirmadas(
        data,
        errorHandler,
        notifications
    ) {
        var
            vm;
        vm = this;
        activate();
        /**
         * functions
         */
        function activate() {
            vm.state = 'pending';
            notifications.loadingAll.pending();
            data
                .readAllConfirmadas()
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
    }
}());
