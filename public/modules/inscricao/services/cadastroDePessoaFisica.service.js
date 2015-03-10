(function () {
    'use strict';
    angular
        .module('inscricao')
        .factory('inscricao.cadastroDePessoaFisica', cadastroDePessoaFisica);
    function cadastroDePessoaFisica() {
        return service;
        function service(sequencia) {
            if (typeof sequencia === 'string') {
                return validar(sequencia);
            }
            if (sequencia === undefined) {
                return gerar();
            }
            throw 'Este serviço aceita um parâmetro String ou nenhum parâmetro. Recebeu [' + typeof sequencia + '].';
        }
        function gerar() {
            var
                n,
                n1,
                n2,
                n3,
                n4,
                n5,
                n6,
                n7,
                n8,
                n9,
                d1,
                d2;
            n = 9;
            n1 = random(n);
            n2 = random(n);
            n3 = random(n);
            n4 = random(n);
            n5 = random(n);
            n6 = random(n);
            n7 = random(n);
            n8 = random(n);
            n9 = random(n);
            d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
            d1 = 11 - (mod(d1, 11));
            if (d1 >= 10) {
                d1 = 0;
            }
            d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
            d2 = 11 - (mod(d2, 11));
            if (d2 >= 10) {
                d2 = 0;
            }
            return [n1, n2, n3, n4, n5, n6, n7, n8, n9, d1, d2].join('');
        }
        function mod(dividendo, divisor) {
            return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
        }
        function random(n) {
            return Math.round(Math.random() * n);
        }
        function validar(sequencia) {
            var
                add,
                i,
                rev;
            if (sequencia === '') {
                return false;
            }
            if (
                sequencia.length !== 11 ||
                sequencia === '00000000000' ||
                sequencia === '11111111111' ||
                sequencia === '22222222222' ||
                sequencia === '33333333333' ||
                sequencia === '44444444444' ||
                sequencia === '55555555555' ||
                sequencia === '66666666666' ||
                sequencia === '77777777777' ||
                sequencia === '88888888888' ||
                sequencia === '99999999999'
            ) {
                return false;
            }
            add = 0;
            for (i = 0; i < 9; i += 1) {
                add += parseInt(sequencia.charAt(i), 10) * (10 - i);
            }
            rev = 11 - (add % 11);
            if (rev === 10 || rev === 11) {
                rev = 0;
            }
            if (rev !== parseInt(sequencia.charAt(9), 10)) {
                return false;
            }
            add = 0;
            for (i = 0; i < 10; i += 1) {
                add += parseInt(sequencia.charAt(i), 10) * (11 - i);
            }
            rev = 11 - (add % 11);
            if (rev === 10 || rev === 11) {
                rev = 0;
            }
            if (rev !== parseInt(sequencia.charAt(10), 10)) {
                return false;
            }
            return true;
        }
    }
}());
