(function () {
    'use strict';
    angular
        .module('inscricao')
        .controller('inscricao.List', List);
    List.$inject = [
        'inscricao.data',
        'inscricao.errorHandler',
        'inscricao.notifications'
    ];
    function List(
        data,
        errorHandler,
        notifications
    ) {
        var
            vm;
        vm = this;
        vm.getButtonClass = getButtonClass;
        vm.select = select;
        activate();
        /**
         * functions
         */
        function activate() {
            vm.state = 'pending';
            notifications.loadingAll.pending();
            data
                .readAll()
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
        function getButtonClass(inscricao) {
            if (inscricao.status === 0) {
                return 'btn-default';
            }
            if (inscricao.status === 1 && +inscricao.valor_pago === 0) {
                return 'btn-info';
            }
            if (
                inscricao.status === 1 && +inscricao.valor_pago !== 0) {
                return 'btn-success';
            }
        }
        function select(inscricao) {
            vm.inscricoes.inscricao = inscricao;
        }
    }
}());
