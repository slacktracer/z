/* eslint camelcase: 0 */
(function () {
    'use strict';
    angular
        .module('inscricao')
        .controller('inscricao.Confirm', Confirm);
    Confirm.$inject = [
        '$scope',
        'inscricao.data',
        'inscricao.errorHandler',
        'inscricao.notifications'
    ];
    function Confirm(
        $scope,
        data,
        errorHandler,
        notifications
    ) {
        var
            vm;
        vm = this;
        vm.actionButtonsDisabled = false;
        vm.afterInvalidSubmission = false;
        vm.isInvalidField = isInvalidField;
        vm.submit = confirm;
        activate();
        /*
         * functions
         */
        function activate() {
            jQuery('#confirmModal').on('hide.bs.modal', function onHideBsModal() {
                reset();
            });
            jQuery('#confirmModal').on('show.bs.modal', function onShowBsModal() {
                set();
            });
        }
        function confirm() {
            vm.afterInvalidSubmission = true;
            vm.actionButtonsDisabled = true;
            if (vm.ficha.$valid) {
                data
                    .confirm(vm.inscricao.copy)
                    .then(function onResolve(inscricao) {
                        if (inscricao.isError) {
                            throw inscricao;
                        }
                        notifications.confirmSuccess();
                        vm.inscricao.status = inscricao.status;
                        vm.inscricao.valor_pago = inscricao.valor_pago;
                        vm.inscricao.data_de_pagamento = inscricao.data_de_pagamento;
                        vm.actionButtonsDisabled = false;
                    })
                    .catch(function onReject(reason) {
                        errorHandler(reason);
                        vm.actionButtonsDisabled = false;
                    });
            } else {
                notifications.invalid();
                vm.actionButtonsDisabled = false;
            }
        }
        function isInvalidField(fieldName) {
            return (
                vm.ficha[fieldName].$invalid &&
                (
                    vm.ficha[fieldName].$touched ||
                    vm.afterInvalidSubmission
                )
            );
        }
        function reset() {
            vm.ficha.$setPristine();
            vm.ficha.$setUntouched();
            vm.afterInvalidSubmission = false;
        }
        function set() {
            vm.inscricao = $scope.list.inscricoes.inscricao;
            vm.inscricao.copy = angular.copy(vm.inscricao);
            $scope.$apply();
        }
    }
}());
