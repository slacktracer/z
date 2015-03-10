/* eslint camelcase: 0 */
(function () {
    'use strict';
    angular
        .module('inscricao')
        .directive('ezEditCursos', ezEditCursos);
    function ezEditCursos() {
        return {
            bindToController: true,
            controller: [
                '$scope',
                controller
            ],
            controllerAs: 'cursos',
            templateUrl: '/modules/inscricao/directives/edit.cursos/edit.cursos.directive.html'
        };
        /**
         * functions
         */
        function controller(
            $scope
        ) {
            var
                edit,
                vm;
            edit = $scope.edit;
            vm = this;
            vm.setunset = setunset;
            activate();
            /**
             * functions
             */
            function activate() {
                if (edit.action === 'editar') {
                    if (edit.inscricao.curso_matutino !== null) {
                        vm.curso_matutino = true;
                        vm.curso_matutino_noneditable = true;
                    }
                    if (edit.inscricao.curso_vespertino !== null) {
                        vm.curso_vespertino = true;
                        vm.curso_vespertino_noneditable = true;
                    }
                }
            }
            function setunset(time) {
                if (vm[time] === false) {
                    edit.inscricao[time] = null;
                }
            }
        }
    }
}());
