(function () {
    'use strict';
    angular
        .module('inscricao')
        .constant('inscricao.settings', {
            'valores': {
                '1': 30,
                '2': 60,
                '3': 80,
                'curso': 20
            },
            'cursos': {
                'AMDI': 'Avaliação multidimensional do idoso',
                'CCAPPPT': 'Enfermagem em estomaterapia - Atenção integral ao paciente traquiostomizado; Atenção integral ao paciente com gastrostomia',
                'ENTADPDHIV': 'Especialidades no tratamento ambulatorial de portadores de HIV',
                'NEC': 'Nutrição e câncer',
                'CCOPD': 'Cuidados com o paciente diabético',
                'SNEEP': 'Suporte nutricional enteral e parenteral'
            }
        });
}());
