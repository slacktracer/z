(function () {
    'use strict';
    angular
        .module('navigation')
        .directive('ezNavigation', ezNavigation);
    ezNavigation.$inject = [];
    function ezNavigation() {
        return {
            controller: controller,
            controllerAs: 'navigation',
            link: link,
            templateUrl: 'modules/navigation/navigation.directive.html'
        };
        /**
         * functions
         */
        function controller() {}
        function link() {}
    }
}());
