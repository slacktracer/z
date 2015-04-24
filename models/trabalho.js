/* eslint camelcase: 0 */
'use strict';
(function (
    models,
    modules,
    settings,
    squel
) {
    let model = {
        create: create,
        countByInscricao: countByInscricao,
        evaluate: evaluate,
        isAllowedToSubmit: isAllowedToSubmit,
        readAll: readAll
    };
    module.exports = model;
    function create(trabalho, inscricao, usuario) {
        return isAllowedToSubmit(inscricao)
            .then(function onResolve(status) {
                if (status) {
                    trabalho = formatIn(trabalho);
                    trabalho = setCase(trabalho);
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
                                // um trabalho tem três estados
                                // (null) não avaliado
                                // (0) reprovado
                                // (1) aprovado
                                // .set('status', 0)
                                .set('__status__', 1)
                        )
                        .then(function onResolve(value) {
                            modules.mailbot(
                                trabalho.area_tematica,
                                trabalho.caminho_do_arquivo,
                                trabalho.nome_do_arquivo,
                                trabalho.titulo,
                                usuario
                            );
                            return value.result.insertId;
                        });
                }
                // A inscrição não está confirmada.
                // Não é permitido submeter trabalho.
                modules.logger.warn(`Tentativa de submissão de trabalho por inscrição não confirmada. Inscrição: ${inscricao}. Status: ${status}.`);
                throw {
                    error: 'Acesso Negado',
                    isError: true,
                    type: 'ACCESS_DENIED'
                };
            });
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
    function evaluate(id, evaluation) {
        let status = evaluation ? 1 : 0;
        return modules
            .executor(
                squel
                    .update()
                    .table('trabalho')
                    .set('status', status)
                    .where('id = ?', id)
            )
            .then(function onResolve(value) {
                return id;
            });
    }
    function formatIn(trabalho) {
        trabalho.autores = trabalho.autores.join(';');
        return trabalho;
    }
    function formatOut(trabalho) {
        trabalho.area_tematica = settings.submission.areaTematicaPorCodigo[trabalho.area_tematica];
        trabalho.tipo_de_resumo = settings.submission.tipoDeResumoPorCodigo[trabalho.tipo_de_resumo];
        trabalho.autores = trabalho.autores.split(';');
        return trabalho;
    }
    function isAllowedToSubmit(inscricao) {
        return models
            .inscricao
            .readStatusById(inscricao);
    }
    function readAll() {
        return modules
            .executor(
                squel
                    .select()
                    .from('trabalho')
                    .where('__status__ = 1')
                    .order('area_tematica')
            )
            .then(function onResolve(value) {
                let trabalhos = value.result.map(function map(trabalho) {
                    return formatOut(trabalho);
                });
                return trabalhos;
            });
    }
    function setCase(trabalho) {
        // trabalho.area_tematica
        trabalho.titulo = trabalho.titulo.toUpperCase();
        trabalho.autores = trabalho.autores.toUpperCase();
        // trabalho.tipo_de_resumo
        trabalho.nome_do_arquivo = trabalho.nome_do_arquivo.toUpperCase();
        return trabalho;
    }
}(
    { //models
        inscricao: require('./inscricao')
    },
    { //modules
        executor: require('../modules/executor'),
        logger: require('../modules/logger'),
        mailbot: require('../modules/mailbot')
    },
    { //settings
        submission: require('../settings/submission')
    },
    require('squel')
));
