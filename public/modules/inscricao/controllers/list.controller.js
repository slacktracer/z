(function () {
    'use strict';
    angular
        .module('inscricao')
        .controller('inscricao.List', List);
    List.$inject = [
        'inscricao.data',
        'inscricao.errorHandler'
    ];
    function List(
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
                .readAll()
                .then(function onResolve(inscricoes) {
                    if (inscricoes.isError) {
                        throw inscricoes;
                    }
                    vm.inscricoes = inscricoes;
                    vm.state = 'fulfilled';
                })
                .catch(function onReject(reason) {
                    errorHandler(reason);
                    vm.state = 'rejected';
                });
        }
    }
}());
