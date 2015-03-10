(function () {
    'use strict';
    angular
        .module('inscricao')
        .directive('ezCadastroDePessoaFisica', ezCadastroDePessoaFisica);
    ezCadastroDePessoaFisica.$inject = [
        'inscricao.cadastroDePessoaFisica'
    ];
    function ezCadastroDePessoaFisica(
        cadastroDePessoaFisica
    ) {
        return {
            link: link,
            require: 'ngModel'
        };
        function link(scope, element, attributes, control) {
            control.$parsers.unshift(setValidity);
            function setValidity(viewValue) {
                if (
                    viewValue &&
                    viewValue.length === 11 &&
                    cadastroDePessoaFisica(viewValue)
                ) {
                    control.$setValidity('cpf', true);
                    return viewValue;
                }
                control.$setValidity('cpf', false);
                return undefined;
            }
        }
    }
}());
