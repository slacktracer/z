(function () {
    'use strict';
    angular
        .module('trabalho')
        .controller('trabalho.Edit', Edit);
    Edit.$inject = [
        '$route',
        '$upload',
        'trabalho.data',
        'session.session'
    ];
    function Edit(
        $route,
        $upload,
        data,
        session
    ) {
        var
            vm;
        vm = this;
        vm.activateTab = activateTab;
        vm.activeTab = '1';
        vm.tabs = [{
            id: '1',
            name: 'Submissão I'
        }, {
            id: '2',
            name: 'Submissão II'
        }];
        vm.forget = reset;
        vm.isInvalidField = isInvalidField;
        vm.setBlurred = setBlurred;
        vm.state = 'pending';
        vm.submit = send;
        vm.tabs.forEach(function forEach(tab) {
            tab.actionButtonsDisabled = false;
            tab.afterInvalidSubmission = false;
            tab.locked = false;
            tab.trabalho = data.example();
        });
        activate();
        /**
         * functions
         */
        function activate() {
            // vm.tabs[0].trabalho = data.example('simples');
            // vm.tabs[1].trabalho = data.example('expandido');
            data
                .readByInscricao(session.inscricao)
                .then(function onResolve(trabalhos) {
                    trabalhos.forEach(function forEach(trabalho, index) {
                        vm.tabs[index].trabalho = trabalho;
                        vm.tabs[index].locked = true;
                    });
                    vm.state = 'fulfilled';
                });
        }
        function activateTab(tab) {
            vm.activeTab = tab;
        }
        function isInvalidField(fieldName, formName, index) {
            return (
                vm[formName][fieldName].$invalid &&
                (
                    vm[formName][fieldName].$$$blurred ||
                    vm.tabs[index].afterInvalidSubmission
                )
            );
        }
        function lockdown(index) {
            vm.tabs[index].locked = true;
        }
        function reset(formName, index) {
            var
                fieldName;
            vm.tabs[index].trabalho = data.example();
            vm.tabs[index].arquivo = "";
            vm[formName].$setPristine();
            vm.tabs[index].afterInvalidSubmission = false;
            for (fieldName in vm.tabs[index][formName]) {
                if (
                    vm[formName].hasOwnProperty(fieldName) &&
                    vm[formName][fieldName] &&
                    vm[formName][fieldName].$$$blurred === true
                ) {
                    vm[formName][fieldName].$$$blurred = false;
                }
            }
        }
        function send(index) {
            vm.tabs[index].afterInvalidSubmission = true;
            vm.tabs[index].actionButtonsDisabled = true;
            if (vm['ficha_' + (index + 1)].$valid) {
                if (
                    vm.tabs[index].arquivo &&
                    vm.tabs[index].arquivo.length
                ) {
                    data
                        .create(
                            vm.tabs[index].trabalho,
                            vm.tabs[index].arquivo[0],
                            function onProgress(event) {
                                var
                                    percentual;
                                percentual = parseInt(100.0 * event.loaded / event.total);
                                vm.tabs[index].arquivo.percentual = percentual;
                            }
                        )
                        .then(function onResolve(value) {
                            if (value.isError) {
                                throw value;
                            }
                            lockdown(index);
                        })
                        .catch(function onReject(reason) {
                            errorHandler(reason);
                            vm.tabs[index].actionButtonsDisabled = false;
                        });
                }
            } else {
                vm.tabs[index].actionButtonsDisabled = false;
            }
        }
        function setBlurred(fieldName, formName) {
            vm[formName][fieldName].$$$blurred = true;
        }
    }
}());
