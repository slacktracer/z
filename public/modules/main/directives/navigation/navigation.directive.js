(function () {
    'use strict';
    angular
        .module('main')
        .directive('ezNavigation', ezNavigation);
    ezNavigation.$inject = [];
    function ezNavigation() {
        return {
            controller: controller,
            controllerAs: 'navigation',
            templateUrl: '/modules/main/directives/navigation/navigation.directive.html'
        };
        /**
         * functions
         */
        function controller() {}
    }
}());
