(function () {
    'use strict';
    angular
        .module('inscricao.relatorio')
        .controller('inscricao.relatorio.Cursos', Cursos);
    Cursos.$inject = [
        'inscricao.relatorio.data',
        'inscricao.relatorio.errorHandler',
        'inscricao.relatorio.notifications'
    ];
    function Cursos(
        data,
        errorHandler,
        notifications
    ) {
        var
            vm;
        vm = this;
        vm.codes = {
            ENTADPDHIV: 'Especialidades no tratamento ambulatorial de portadores de HIV.',
            NEC: 'Nutrição e câncer.',
            CCAPPPT: 'Enfermagem em estomaterapia - Atenção integral ao paciente traquiostomizado; Atenção integral ao paciente com gastrostomia.',
            CCOPD: 'Cuidados com o paciente diabético.',
            SNEEP: 'Suporte nutricional enteral e parenteral.',
            TOECHFERDP: 'Terapia ocupacional em contextos hospitalares: fundamentação e relatos de prática.',
            AMDI: 'Avaliação multidimensional do idoso.'
        };
        activate();
        /**
         * functions
         */
        function activate() {
            vm.state = 'pending';
            notifications.loadingAll.pending();
            data
                .readAllCursos()
                .then(function onResolve(cursos) {
                    if (cursos.isError) {
                        throw cursos;
                    }
                    notifications.loadingAll.fulfilled();
                    vm.matutinos = cursos.matutinos;
                    vm.vespertinos = cursos.vespertinos;
                    vm.matutinosNaoConfirmados = cursos.matutinosNaoConfirmados;
                    vm.vespertinosNaoConfirmados = cursos.vespertinosNaoConfirmados;
                    vm.state = 'fulfilled';
                })
                .catch(function onReject(reason) {
                    notifications.loadingAll.rejected();
                    errorHandler(reason);
                    vm.state = 'rejected';
                });
        }
    }
}());
