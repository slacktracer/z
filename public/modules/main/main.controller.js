(function () {
    'use strict';
    angular
        .module('main')
        .controller('Main', main);
    main.$inject = [
        'session.session'
    ];
    function main(
        session
    ) {
        var
            vm;
        vm = this;
        session.attach(vm);
        activate();
        /**
         * functions
         */
        function activate() {
            setState();
            session.on('sessionSet', setState);
        }
        function setState() {
            vm.state = session.getState();
        }
    }
}());
