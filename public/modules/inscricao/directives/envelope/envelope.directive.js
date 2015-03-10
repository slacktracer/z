(function () {
    'use strict';
    angular
        .module('inscricao')
        .directive('ezEnvelope', ezEnvelope);
    function ezEnvelope() {
        return {
            bindToController: true,
            controller: controller,
            controllerAs: 'envelope',
            scope: {
                state: '='
            },
            templateUrl: '/modules/inscricao/directives/envelope/envelope.directive.html',
            transclude: true
        };
        /**
         * functions
         */
        function controller() {}
    }
}());
