'use strict';
(function (
    modules,
    settings,
    squel
) {
    let model = {
        create: create,
        readByInscricao: readByInscricao,
        readIdsByInscricao: readIdsByInscricao
    };
    module.exports = model;
    function create(trabalho, arquivo, inscricao) {
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
                trabalho.id = value.result.insertId;
                return {
                    id: trabalho.id,
                    nome_do_arquivo: trabalho.nome_do_arquivo
                };
            });
    }
    function formatIn(trabalho) {
        trabalho.autores = trabalho.autores.join();
    }
    function formatOut(trabalho) {
        trabalho.autores = trabalho.autores.split(',');
    }
    function readByInscricao(inscricao) {
        return modules
            .executor(
                squel
                    .select()
                    .from('trabalho')
                    .where('inscricao')
                    .where('inscricao = ?', inscricao)
            )
            .then(function onResolve(value) {
                let trabalhos = value.result;
                trabalhos.forEach(function forEach(trabalho) {
                    formatOut(trabalho);
                })
                return trabalhos;
            });
    }
    function readIdsByInscricao(inscricao) {
        return modules
            .executor(
                squel
                    .select()
                    .field('id')
                    .from('trabalho')
                    .where('inscricao = ?', inscricao)
            )
            .then(function onResolve(value) {
                let ids = value.result;
                if (ids.length > 2) {
                    modules.logger.warn(`Atenção! Inscrição com mais de dois trabalhos: ${inscricao}.`);
                }
                return ids;
            });
    }
}(
    { //modules
        executor: require('../modules/executor'),
        logger: require('../modules/logger')
    },
    { //settings
        database: require('../settings/database')
    },
    require('squel')
));
