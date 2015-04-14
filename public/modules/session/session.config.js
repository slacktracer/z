(function () {
    'use strict';
    angular
        .module('session')
        .config(config);
    config.$inject = [
        'ngToastProvider'
    ];
    function config(
        ngToastProvider
    ) {
        ngToastProvider.configure({
            additionalClasses: 'toast',
            horizontalPosition: 'center'
        });
    }
}());
