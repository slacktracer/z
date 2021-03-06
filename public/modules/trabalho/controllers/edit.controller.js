(function () {
    'use strict';
    angular
        .module('trabalho')
        .controller('trabalho.Edit', Edit);
    Edit.$inject = [
        '$location',
        '$route',
        '$upload',
        'trabalho.data',
        'trabalho.errorHandler',
        'trabalho.notifications',
        'trabalho.settings',
        'session.session'
    ];
    function Edit(
        $location,
        $route,
        $upload,
        data,
        errorHandler,
        notifications,
        settings,
        session
    ) {
        var
            vm;
        vm = this;
        vm.actionButtonsDisabled = false;
        vm.afterInvalidSubmission = false;
        vm.allowed = true;
        vm.blocked = false;
        vm.devMode = settings.devMode;
        vm.ended = true;
        vm.examples = {
            'autores': 'FIGUEIREDO, T.C.; ALVES, E.R.'
        };
        vm.forget = reset;
        vm.isInvalidField = isInvalidField;
        vm.limiteDeSubmissoes = settings.limiteDeSubmissoes;
        vm.state = 'pending';
        vm.submit = send;
        vm.trabalho = data.example();
        activate();
        /**
         * functions
         */
        function activate() {
            notifications.loadingCount.pending();
            notifications.verifyingAllowed.pending();
            data
                .countByInscricao()
                .then(function onResolve(quantidade) {
                    notifications.loadingCount.fulfilled();
                    vm.blocked = quantidade >= vm.limiteDeSubmissoes;
                    vm.state = 'fulfilled';
                })
                .catch(function onReject(reason) {
                    notifications.loadingCount.rejected();
                    errorHandler(reason);
                    vm.state = 'rejected';
                });
            data
                .isAllowedToSubmit()
                .then(function onResolve(allowed) {
                    notifications.verifyingAllowed.fulfilled();
                    vm.allowed = allowed;
                    vm.state = 'fulfilled';
                })
                .catch(function onReject(reason) {
                    notifications.verifyingAllowed.rejected();
                    errorHandler(reason);
                    vm.state = 'rejected';
                });
        }
        function isInvalidField(fieldName) {
            return (
                vm.ficha[fieldName].$invalid &&
                (
                    vm.ficha[fieldName].$touched ||
                    vm.afterInvalidSubmission
                )
            );
        }
        function reset() {
            vm.trabalho = data.example();
            vm.ficha.$setPristine();
            vm.ficha.$setUntouched();
            vm.afterInvalidSubmission = false;
        }
        function send() {
            vm.afterInvalidSubmission = true;
            vm.actionButtonsDisabled = true;
            if (vm.ficha.$valid) {
                if (
                    vm.arquivo &&
                    vm.arquivo.length
                ) {
                    notifications.sending.pending();
                    data
                        .create(
                            vm.trabalho,
                            vm.arquivo[0],
                            function onProgress(event) {
                                var
                                    percentual;
                                percentual = parseInt(100.0 * event.loaded / event.total);
                                vm.percentualDeEnvioDoArquivo = percentual;
                            }
                        )
                        .then(function onResolve(value) {
                            if (value.isError) {
                                throw value;
                            }
                            notifications.sending.fulfilled();
                            $location.path('/inscricao/' + session.inscricao);
                        })
                        .catch(function onReject(reason) {
                            notifications.sending.rejected();
                            errorHandler(reason);
                            vm.percentualDeEnvioDoArquivo = 0;
                            vm.actionButtonsDisabled = false;
                        });
                } else {
                    notifications.invalid();
                    vm.actionButtonsDisabled = false;
                }
            } else {
                notifications.invalid();
                vm.actionButtonsDisabled = false;
            }
        }
    }
}());
