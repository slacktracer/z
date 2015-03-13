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
        session
    ) {
        var
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
        vm.setBlurred = setBlurred;
        activate(vm.action);
        /**
         * functions
         */
        function activate(action) {
            vm.inscricao = data.example('Thiago');
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
                    vm.ficha[fieldName].$$$blurred ||
                    vm.afterInvalidSubmission
                )
            );
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
            var
                property;
            vm.inscricao = data.example();
            vm.ficha.$setPristine();
            vm.afterInvalidSubmission = false;
            for (property in vm.ficha) {
                if (
                    vm.ficha.hasOwnProperty(property) &&
                    vm.ficha[property] &&
                    vm.ficha[property].$$$blurred === true
                ) {
                    vm.ficha[property].$$$blurred = false;
                }
            }
        }
        function save() {
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
                        vm.actionButtonsDisabled = false;
                        session.renew();
                        $location.path('/inscricao/' + value);
                    })
                    .catch(function onReject(reason) {
                        notifications.saving.rejected();
                        errorHandler(reason);
                        vm.actionButtonsDisabled = false;
                    });
            } else {
                notifications.invalid();
                vm.actionButtonsDisabled = false;
            }
        }
        function setBlurred(fieldName) {
            vm.ficha[fieldName].$$$blurred = true;
        }
        function update() {
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
                notifications.invalid();
                vm.actionButtonsDisabled = false;
            }
        }
    }
}());
