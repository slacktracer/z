(function () {
    'use strict';
    angular
        .module('inscricao')
        .directive('ezPagamento', ezPagamento);
    function ezPagamento() {
        return {
            bindToController: true,
            controller: [
                '$scope',
                'inscricao.data',
                'settings.valores',
                controller
            ],
            controllerAs: 'pagamento',
            templateUrl: '/modules/inscricao/directives/pagamento/pagamento.directive.html'
        };
        /**
         * functions
         */
        function controller(
            $scope,
            data,
            valores
        ) {
            var
                view,
                vm;
            view = $scope.view;
            vm = this;
            vm.status = 'verifying';
            vm.valor = 0;
            activate();
            /**
             * functions
             */
            function activate() {
                vm.valor = calculate();
                data
                    .readStatusById(view.inscricao.id)
                    .then(function onResolve(status) {
                        vm.status = status;
                    });
            }
            function calculate() {
                var
                    valor;
                valor = valores[view.inscricao.categoria];
                if (view.inscricao.curso_matutino) {
                    valor += valores.curso;
                }
                if (
                    view.inscricao.curso_vespertino &&
                    view.inscricao.curso_vespertino !== 'CCOPD'
                ) {
                    valor += valores.curso;
                }
                return valor;
            }
        }
    }
}());
