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
                'inscricao.settings',
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
            settings
        ) {
            var
                view,
                vm;
            view = $scope.view;
            vm = this;
            vm.valor = 0;
            activate();
            /**
             * functions
             */
            function activate() {
                vm.valor = calculate();
            }
            function calculate() {
                var
                    valor;
                valor = settings.valores[view.inscricao.categoria];
                if (view.inscricao.curso_matutino) {
                    valor += settings.valores.curso;
                }
                if (
                    view.inscricao.curso_vespertino &&
                    view.inscricao.curso_vespertino !== 'CCOPD'
                ) {
                    valor += settings.valores.curso;
                }
                return valor;
            }
        }
    }
}());
