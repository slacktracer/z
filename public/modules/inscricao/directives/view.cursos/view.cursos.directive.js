(function () {
    'use strict';
    angular
        .module('inscricao')
        .directive('ezViewCursos', ezViewCursos);
    function ezViewCursos() {
        return {
            bindToController: true,
            controller: controller,
            controllerAs: 'cursos',
            templateUrl: '/modules/inscricao/directives/view.cursos/view.cursos.directive.html'
        };
        /**
         * functions
         */
        function controller() {}
    }
}());
