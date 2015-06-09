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
        'inscricao.notifications',
        'inscricao.settings'
    ];
    function Confirm(
        $scope,
        data,
        errorHandler,
        notifications,
        settings
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
        function calculate(categoria, cursoMatutino, cursoVespertino) {
            var
                totalPorEtapa;
            totalPorEtapa = [];
            totalPorEtapa[0] = settings.valoresPorEtapa['até 31/05'][categoria];
            totalPorEtapa[1] = settings.valoresPorEtapa['até 31/07'][categoria];
            totalPorEtapa[2] = settings.valoresPorEtapa['até o evento'][categoria];
            if (cursoMatutino) {
                totalPorEtapa[0] += settings.valoresPorEtapa['até 31/05'].curso;
                totalPorEtapa[1] += settings.valoresPorEtapa['até 31/07'].curso;
                totalPorEtapa[2] += settings.valoresPorEtapa['até o evento'].curso;
            }
            if (
                cursoVespertino &&
                cursoVespertino !== 'AMDI'
            ) {
                totalPorEtapa[0] += settings.valoresPorEtapa['até 31/05'].curso;
                totalPorEtapa[1] += settings.valoresPorEtapa['até 31/07'].curso;
                totalPorEtapa[2] += settings.valoresPorEtapa['até o evento'].curso;
            }
            return totalPorEtapa;
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
            vm.inscricao.copy.categoria = settings.categorias[vm.inscricao.copy.categoria];
            vm.inscricao.copy.curso_matutino = settings.cursos[vm.inscricao.copy.curso_matutino];
            vm.inscricao.copy.curso_vespertino = settings.cursos[vm.inscricao.copy.curso_vespertino];
            vm.valoresPorEtapa = calculate(vm.inscricao.categoria, vm.inscricao.curso_matutino, vm.inscricao.curso_vespertino);
            $scope.$apply();
        }
    }
}());
