(function () {
    'use strict';
    angular
        .module('trabalho')
        .controller('trabalho.List', List);
    List.$inject = [
        'trabalho.data',
        'trabalho.errorHandler',
        'trabalho.notifications'
    ];
    function List(
        data,
        errorHandler,
        notifications
    ) {
        var
            vm;
        vm = this;
        vm.actionButtonsDisabled = false;
        vm.advise = advise;
        vm.evaluate = evaluate;
        vm.filterAvaliados = true;
        vm.filteredTotal = 0;
        vm.filterFunction = filterFunction;
        vm.filterNaoAvaliados = true;
        activate();
        /**
         * functions
         */
        function activate() {
            notifications.loadingAll.pending();
            vm.state = 'pending';
            data
                .readAll()
                .then(function onResolve(trabalhos) {
                    if (trabalhos.isError) {
                        throw trabalhos;
                    }
                    notifications.loadingAll.fulfilled();
                    vm.trabalhos = trabalhos;
                    vm.state = 'fulfilled';
                })
                .catch(function onReject(reason) {
                    notifications.loadingAll.rejected();
                    errorHandler(reason);
                    vm.state = 'rejected';
                });
        }
        function advise(trabalho, advice) {
            vm.actionButtonsDisabled = true;
            notifications.advising.pending();
            data
                .advise(trabalho.id, advice)
                .then(function onResolve(value) {
                    if (value.isError) {
                        throw value;
                    }
                    trabalho.recomendacao = value.advice;
                    notifications.advising.fulfilled();
                    vm.actionButtonsDisabled = false;
                })
                .catch(function onReject(reason) {
                    notifications.advising.rejected();
                    errorHandler(reason);
                    vm.actionButtonsDisabled = false;
                });
        }
        function evaluate(trabalho, evaluation) {
            vm.actionButtonsDisabled = true;
            notifications.evaluating.pending();
            data
                .evaluate(trabalho.id, evaluation)
                .then(function onResolve(value) {
                    if (value.isError) {
                        throw value;
                    }
                    trabalho.status = value.status;
                    notifications.evaluating.fulfilled();
                    vm.actionButtonsDisabled = false;
                })
                .catch(function onReject(reason) {
                    notifications.evaluating.rejected();
                    errorHandler(reason);
                    vm.actionButtonsDisabled = false;
                });
        }
        function filterFunction(row) {
            if (vm.filterAvaliados && !vm.filterNaoAvaliados) {
                return row.status !== null;
            }
            if (!vm.filterAvaliados && vm.filterNaoAvaliados) {
                return row.status === null;
            }
            if (!vm.filterAvaliados && !vm.filterNaoAvaliados) {
                return false;
            }
            return true;
        }
    }
}());
