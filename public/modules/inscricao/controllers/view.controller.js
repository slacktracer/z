(function () {
    'use strict';
    angular
        .module('inscricao')
        .controller('inscricao.View', View);
    View.$inject = [
        '$routeParams',
        'inscricao.data',
        'inscricao.errorHandler'
    ];
    function View(
        $routeParams,
        data,
        errorHandler
    ) {
        var
            vm;
        vm = this;
        activate();
        /**
         * functions
         */
        function activate() {
            vm.state = 'pending';
            data
                .readById($routeParams.id)
                .then(function onResolve(inscricao) {
                    if (inscricao.isError) {
                        throw inscricao;
                    }
                    vm.inscricao = inscricao;
                    vm.state = 'fulfilled';
                })
                .catch(function onReject(reason) {
                    errorHandler(reason);
                    vm.state = 'rejected';
                });
        }
    }
}());
