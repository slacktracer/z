(function () {
    'use strict';
    angular
        .module('inscricao')
        .controller('inscricao.View', View);
    View.$inject = [
        '$routeParams',
        'inscricao.data',
        'inscricao.errorHandler',
        'inscricao.notifications'
    ];
    function View(
        $routeParams,
        data,
        errorHandler,
        notifications
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
            notifications.loadingOne.pending();
            data
                .readById($routeParams.id)
                .then(function onResolve(inscricao) {
                    if (inscricao.isError) {
                        throw inscricao;
                    }
                    notifications.loadingOne.fulfilled();
                    vm.inscricao = inscricao;
                    vm.state = 'fulfilled';
                })
                .catch(function onReject(reason) {
                    notifications.loadingOne.rejected();
                    errorHandler(reason);
                    vm.state = 'rejected';
                });
        }
    }
}());
