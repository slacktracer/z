(function () {
    'use strict';
    angular
        .module('inscricao')
        .directive('ezValidDate', ezValidDate);
    ezValidDate.$inject = [
        'main.moment'
    ];
    function ezValidDate(
        moment
    ) {
        return {
            link: link,
            require: 'ngModel'
        };
        function link(scope, element, attributes, control) {
            control.$parsers.unshift(setValidity);
            function setValidity(viewValue) {
                if (viewValue === '') {
                    control.$setValidity('valid-date', true);
                    return '';
                }
                if (moment(viewValue, 'D/M/YYYY', true).isValid()) {
                    control.$setValidity('valid-date', true);
                    return viewValue;
                }
                control.$setValidity('valid-date', false);
                return undefined;
            }
        }
    }
}());
