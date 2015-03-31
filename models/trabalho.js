/* eslint camelcase: 0 */
'use strict';
(function (
    modules,
    settings,
    squel
) {
    let model = {
        create: create,
        countByInscricao: countByInscricao
    };
    module.exports = model;
    function create(trabalho, inscricao, usuario) {
        formatIn(trabalho);
        return modules
            .executor(
                squel
                    .insert()
                    .into('trabalho')
                    .set('inscricao', inscricao)
                    .set('area_tematica', trabalho.area_tematica)
                    .set('titulo', trabalho.titulo)
                    .set('autores', trabalho.autores)
                    .set('tipo_de_resumo', trabalho.tipo_de_resumo)
                    .set('nome_do_arquivo', trabalho.nome_do_arquivo)
                    .set('status', 0)
                    .set('__status__', 1)
            )
            .then(function onResolve(value) {
                modules.mailbot(
                    trabalho.caminho_do_arquivo,
                    trabalho.nome_do_arquivo,
                    usuario
                );
                return value.result.insertId;
            });
    }
    function formatIn(trabalho) {
        trabalho.autores = trabalho.autores.join();
    }
    function formatOut(trabalho) {
        trabalho.autores = trabalho.autores.split(',');
    }
    function countByInscricao(inscricao) {
        return modules
            .executor(
                squel
                    .select()
                    .from('trabalho')
                    .where('inscricao = ?', inscricao)
            )
            .then(function onResolve(value) {
                return value.result.length;
            });
    }
}(
    { //modules
        executor: require('../modules/executor'),
        logger: require('../modules/logger'),
        mailbot: require('../modules/mailbot')
    },
    { //settings
        database: require('../settings/database')
    },
    require('squel')
));
