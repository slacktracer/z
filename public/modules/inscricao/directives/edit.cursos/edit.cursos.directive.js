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
                '$rootScope',
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
            $rootScope,
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
                $scope.$watch(cursoMatutinoWatchExpression, listener);
                $scope.$watch(cursoVespertinoWatchExpression, listener);
                if (edit.action === 'editar') {
                    if (edit.inscricao.curso_matutino !== null) {
                        vm.curso_matutino = true;
                        vm.curso_matutino_noneditable = true;
                    }
                    if (edit.inscricao.curso_vespertino !== null) {
                        vm.curso_vespertino = true;
                        vm.curso_vespertino_noneditable = true;
                    }
                    if (edit.inscricao.status === 1) {
                        vm.curso_matutino_noneditable = true;
                        vm.curso_vespertino_noneditable = true;
                    }
                }
            }
            function cursoMatutinoWatchExpression() {
                return edit.inscricao.curso_matutino;
            }
            function cursoVespertinoWatchExpression() {
                return edit.inscricao.curso_vespertino;
            }
            function listener(newValue, oldValue, scope) {
                if (
                    newValue === 'AMDI' &&
                    oldValue === 'AMDI'
                ) {
                    return;
                }
                if (newValue === 'AMDI') {
                    vm.curso_matutino = true;
                    edit.inscricao.curso_matutino = 'AMDI';
                    vm.curso_vespertino = true;
                    edit.inscricao.curso_vespertino = 'AMDI';
                }
                if (oldValue === 'AMDI') {
                    if (edit.inscricao.curso_matutino === 'AMDI') {
                        edit.inscricao.curso_matutino = null;
                        vm.curso_matutino = false;
                    }
                    if (edit.inscricao.curso_vespertino === 'AMDI') {
                        edit.inscricao.curso_vespertino = null;
                        vm.curso_vespertino = false;
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
