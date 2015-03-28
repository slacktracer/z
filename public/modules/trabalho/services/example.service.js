(function () {
    'use strict';
    angular
        .module('trabalho')
        .factory('trabalho.example', example);
    return;
    function example() {
        var
            empty,
            examples;
        empty = {
            'id': 0,
            'area_tematica': '',
            'titulo': '',
            'autores': [],
            'tipo_de_resumo': '',
            'nome_do_arquivo': '',
            'aprovado': false,
            '__status__': 1
        };
        examples = {
            'simples': {
                'id': '0',
                'area_tematica': 13,
                'titulo': 'Acidentes por Animais Peçonhentos no Estado do Pará no Ano de 2011',
                'autores': [
                    'FIGUEIREDO, T.C.',
                    'ALVES, E.R.'
                ],
                'tipo_de_resumo': 1,
                'nome_do_arquivo': 'acidentes.docx',
                'aprovado': false,
                '__status__': 1
            },
            'expandido': {
                'id': '0',
                'area_tematica': 18,
                'titulo': 'Perfil de Sensibilidade Antimicrobiana de Membros do Complexo mycobacterium simiae no Estado do Pará',
                'autores': [
                    'FIGUEIREDO, T.C.',
                    'ALVES, E.R.'
                ],
                'tipo_de_resumo': 2,
                'nome_do_arquivo': 'perfil.docx',
                'aprovado': false,
                '__status__': 1
            }
        };
        return service;
        function service(name) {
            if (examples[name]) {
                return JSON.parse(JSON.stringify(examples[name]));
            }
            return JSON.parse(JSON.stringify(empty));
        }
    }
}());
