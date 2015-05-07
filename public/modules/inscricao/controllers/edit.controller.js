(function () {
    'use strict';
    angular
        .module('inscricao')
        .controller('inscricao.Edit', Edit);
    Edit.$inject = [
        '$location',
        '$route',
        '$routeParams',
        'inscricao.cadastroDePessoaFisica',
        'inscricao.data',
        'inscricao.errorHandler',
        'inscricao.notifications',
        'logToServer.logToServer',
        'session.session'
    ];
    function Edit(
        $location,
        $route,
        $routeParams,
        cadastroDePessoaFisica,
        data,
        errorHandler,
        notifications,
        logToServer,
        session
    ) {
        var
            activationTime,
            vm;
        vm = this;
        vm.action = $route.current.locals.action;
        vm.actionButtonsDisabled = false;
        vm.afterInvalidSubmission = false;
        vm.examples = {
            'cpf': cadastroDePessoaFisica(),
            'data_de_nascimento': '5/8/1981'
        };
        vm.isInvalidField = isInvalidField;
        activate(vm.action);
        /**
         * functions
         */
        function activate(action) {
            activationTime = Date.now();
            vm.inscricao = data.example();
            vm.state = 'pending';
            if (action === 'nova') {
                vm.submit = save;
                vm.forget = reset;
                vm.state = 'fulfilled';
                setEmail();
                return;
            }
            vm.submit = update;
            notifications.loadingOne.pending();
            data
                .readById($routeParams.id)
                .then(function onResolve(inscricao) {
                    if (inscricao.isError) {
                        throw inscricao;
                    }
                    notifications.loadingOne.fulfilled();
                    vm.forget = cancel.bind(undefined, inscricao);
                    vm.inscricao = inscricao;
                    vm.state = 'fulfilled';
                })
                .catch(function onReject(reason) {
                    notifications.loadingOne.rejected();
                    errorHandler(reason);
                    vm.actionButtonsDisabled = false;
                    vm.state = 'rejected';
                });
        }
        function cancel(inscricao) {
            $location.path('/inscricao/' + inscricao.id);
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
        function logInvalidFields() {
            var
                invalidFields,
                fieldName;
            invalidFields = {
                fields: {},
                title: 'Invalid Fields'
            };
            for (fieldName in vm.ficha) {
                if (
                    vm.ficha[fieldName] &&
                    vm.ficha[fieldName].$invalid
                ) {
                    invalidFields.fields[fieldName] = vm.ficha[fieldName].$viewValue;
                }
            }
            logToServer.info({
                content: invalidFields
            });
        }
        function setEmail() {
            if (session.email !== null) {
                vm.inscricao.email = session.email;
                return;
            }
            session.on('sessionSet', function onSessionSet(email) {
                vm.inscricao.email = email;
            });
        }
        function reset() {
            vm.inscricao = data.example();
            vm.ficha.$setPristine();
            vm.ficha.$setUntouched();
            vm.afterInvalidSubmission = false;
        }
        function save() {
            logToServer.info({
                content: ((Date.now() - activationTime) / 1000) + 's',
                title: 'Time to Save'
            });
            vm.afterInvalidSubmission = true;
            vm.actionButtonsDisabled = true;
            if (vm.ficha.$valid) {
                notifications.saving.pending();
                data
                    .create(vm.inscricao)
                    .then(function onResolve(value) {
                        if (value.isError) {
                            throw value;
                        }
                        notifications.saving.fulfilled();
                        session.renew();
                        $location.path('/inscricao/' + value);
                    })
                    .catch(function onReject(reason) {
                        notifications.saving.rejected();
                        errorHandler(reason);
                        vm.actionButtonsDisabled = false;
                    });
            } else {
                logInvalidFields();
                notifications.invalid();
                vm.actionButtonsDisabled = false;
            }
        }
        function update() {
            logToServer.info({
                content: ((Date.now() - activationTime) / 1000) + 's',
                title: 'Time to Update'
            });
            vm.afterInvalidSubmission = true;
            vm.actionButtonsDisabled = true;
            if (vm.ficha.$valid) {
                notifications.saving.pending();
                data
                    .update(vm.inscricao)
                    .then(function onResolve(value) {
                        if (value.isError) {
                            throw value;
                        }
                        notifications.saving.fulfilled();
                        vm.actionButtonsDisabled = false;
                        session.renew();
                        $location.path('/inscricao/' + vm.inscricao.id);
                    })
                    .catch(function onReject(reason) {
                        notifications.saving.rejected();
                        errorHandler(reason);
                        vm.actionButtonsDisabled = false;
                    });
            } else {
                logInvalidFields();
                notifications.invalid();
                vm.actionButtonsDisabled = false;
            }
        }
    }
}());
