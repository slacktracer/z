(function () {
    'use strict';
    angular
        .module('inscricao')
        .factory('inscricao.example', example);
    return;
    function example() {
        var
            empty,
            examples;
        empty = {
            'id': 0,
            'nome_completo': '',
            'data_de_nascimento': '',
            'sexo': 'Feminino',
            'email': '',
            'estrangeiro': false,
            'cpf': '',
            'nome_do_documento': '',
            'numero_do_documento': '',
            'codigo_internacional_1': '55',
            'codigo_nacional_1': '',
            'numero_1': '',
            'codigo_internacional_2': '55',
            'codigo_nacional_2': '',
            'numero_2': '',
            'codigo_internacional_3': '55',
            'codigo_nacional_3': '',
            'numero_3': '',
            'logradouro': '',
            'numero': '',
            'complemento': '',
            'bairro': '',
            'localidade': '',
            'uf': '',
            'cep': '',
            'endereco': '',
            'nome_no_cracha': '',
            'categoria': '1',
            'curso_ou_formacao': '',
            'acronimo_da_instituicao_ou_empresa': '',
            'nome_da_instituicao_ou_empresa': '',
            '__status__': '1'
        };
        examples = {
            'Thiago': {
                'id': 0,
                'nome_completo': 'Thiago F',
                'data_de_nascimento': '5/8/1981',
                'sexo': 'Masculino',
                'email': 'slacktracer@gmail.com',
                'estrangeiro': false,
                'cpf': '86279325814',
                'nome_do_documento': '',
                'numero_do_documento': '',
                'codigo_internacional_1': '55',
                'codigo_nacional_1': '91',
                'numero_1': '32242991',
                'codigo_internacional_2': '55',
                'codigo_nacional_2': '91',
                'numero_2': '980274849',
                'codigo_internacional_3': '55',
                'codigo_nacional_3': '',
                'numero_3': '',
                'logradouro': 'Rua Jerônimo Pimentel',
                'numero': '236',
                'complemento': '',
                'bairro': 'Umarizal',
                'localidade': 'Belém',
                'uf': 'PA',
                'cep': '66055000',
                'endereco': '',
                'nome_no_cracha': 'Thiago F',
                'categoria': '1',
                'curso_ou_formacao': 'Tecnologia em Processamento de Dados',
                'acronimo_da_instituicao_ou_empresa': 'UNAMA',
                'nome_da_instituicao_ou_empresa': 'Universidade da Amazônia',
                '__status__': '1'
            },
            'Sherlock': {
                'id': 0,
                'nome_completo': 'Sherlock Holmes',
                'data_de_nascimento': '6/1/1854',
                'sexo': 'Masculino',
                'email': 'sh@johnwatsonblog.co.uk',
                'estrangeiro': true,
                'cpf': '',
                'nome_do_documento': 'Passport',
                'numero_do_documento': 'S443778',
                'codigo_internacional_1': '44',
                'codigo_nacional_1': '207',
                'numero_1': '2243688',
                'codigo_internacional_2': '55',
                'codigo_nacional_2': '',
                'numero_2': '',
                'codigo_internacional_3': '55',
                'codigo_nacional_3': '',
                'numero_3': '',
                'endereco': '221b Baker Street\nLondon\nNW1 6XE\nEngland',
                'logradouro': '',
                'numero': '',
                'complemento': '',
                'bairro': '',
                'localidade': '',
                'uf': '',
                'cep': '',
                'nome_no_cracha': 'Holmes',
                'categoria': '2',
                'curso_ou_formacao': 'Consulting Detective',
                'acronimo_da_instituicao_ou_empresa': '',
                'nome_da_instituicao_ou_empresa': 'Scotland Yard'
            }
        };
        return service;
        function service(name) {
            if (examples[name]) {
                return examples[name];
            }
            return Object.create(empty);
        }
    }
}());
