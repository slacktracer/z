(function () {
    'use strict';
    angular
        .module('main')
        .directive('ezEnvelope', ezEnvelope);
    function ezEnvelope() {
        return {
            bindToController: true,
            controller: controller,
            controllerAs: 'envelope',
            scope: {
                state: '='
            },
            templateUrl: '/modules/main/directives/envelope/envelope.directive.html',
            transclude: true
        };
        /**
         * functions
         */
        function controller() {}
    }
}());
