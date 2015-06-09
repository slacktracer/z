(function () {
    'use strict';
    angular
        .module('inscricao')
        .constant('inscricao.settings', {
            'valores': {
                '1': 50,
                '2': 80,
                '3': 100,
                'curso': 20
            },
            'categorias': {
                '1': 'Estudante de Graduação',
                '2': 'Estudante de Pós-Graduação ou Residente',
                '3': 'Docente ou Profissional'
            },
            'cursos': {
                'AMDI': 'Avaliação multidimensional do idoso',
                'CCAPPPT': 'Enfermagem em estomaterapia - Atenção integral ao paciente traquiostomizado; Atenção integral ao paciente com gastrostomia',
                'ENTADPDHIV': 'Especialidades no tratamento ambulatorial de portadores de HIV',
                'NEC': 'Nutrição e câncer',
                'CCOPD': 'Cuidados com o paciente diabético',
                'SNEEP': 'Suporte nutricional enteral e parenteral'
            },
            'valoresPorEtapa': {
                'até 31/05': {
                    '1': 30,
                    '2': 60,
                    '3': 80,
                    'curso': 20
                },
                'até 31/07': {
                    '1': 50,
                    '2': 80,
                    '3': 100,
                    'curso': 20
                },
                'até o evento': {
                    '1': 70,
                    '2': 100,
                    '3': 120,
                    'curso': 20
                }
            }
        });
}());
