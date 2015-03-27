/* eslint camelcase: 0 */
'use strict';
(function (
    bluebird,
    modules,
    moment,
    squel
) {
    let Promise = bluebird;
    let model = {
        create: create,
        readAll: readAll,
        readById: readById,
        readStatusById: readStatusById,
        update: update
    };
    module.exports = model;
    function cpf(number) {
        return modules
            .executor(
                squel
                    .select()
                    .field('cpf')
                    .from('inscricao')
                    .where('cpf = ?', number)
            )
            .then(function onResolve(value) {
                if (value.result.length > 0) {
                    if (value.result.length > 1) {
                        modules.logger.warn(`Atenção! CPF repetido na base de dados: ${number}`);
                    }
                    return true;
                }
                return false;
            });
    }
    function create(inscricao, email) {
        return cpf(inscricao.cpf)
            .then(function onResolve(value) {
                if (value === true) {
                    throw {
                        isError: true,
                        type: 'CPF_REPETIDO'
                    };
                }
                return executeCreate(inscricao, email);
            });
    }
    function executeCreate(inscricao, email) {
        inscricao = formatIn(inscricao);
        inscricao = setCase(inscricao);
        return modules
            .executor(
                squel
                    .insert()
                    .into('inscricao')
                    .set('nome_completo', inscricao.nome_completo)
                    .set('data_de_nascimento', inscricao.data_de_nascimento)
                    .set('sexo', inscricao.sexo)
                    .set('email', inscricao.email)
                    .set('estrangeiro', inscricao.estrangeiro)
                    .set('cpf', inscricao.cpf)
                    .set('nome_do_documento', inscricao.nome_do_documento)
                    .set('numero_do_documento', inscricao.numero_do_documento)
                    .set('telefones', inscricao.telefones)
                    .set('logradouro', inscricao.logradouro)
                    .set('numero', inscricao.numero)
                    .set('complemento', inscricao.complemento)
                    .set('bairro', inscricao.bairro)
                    .set('localidade', inscricao.localidade)
                    .set('uf', inscricao.uf)
                    .set('cep', inscricao.cep)
                    .set('endereco', inscricao.endereco)
                    .set('nome_no_cracha', inscricao.nome_no_cracha)
                    .set('categoria', inscricao.categoria)
                    .set('curso_ou_formacao', inscricao.curso_ou_formacao)
                    .set('acronimo_da_instituicao_ou_empresa', inscricao.acronimo_da_instituicao_ou_empresa)
                    .set('nome_da_instituicao_ou_empresa', inscricao.nome_da_instituicao_ou_empresa)
                    .set('status', 0)
                    .set('valor_pago', 0)
                    .set('curso_matutino', inscricao.curso_matutino)
                    .set('curso_vespertino', inscricao.curso_vespertino)
                    .set('__status__', 1)
            )
            .then(function onResolve(value) {
                inscricao.id = value.result.insertId;
            })
            .then(function onResolve() {
                return modules
                    .executor(
                        squel
                            .update()
                            .table('usuario')
                            .set('inscricao', inscricao.id)
                            .where('email = ?', email)
                            .where('__status__ = 1')
                    );
            })
            .then(function onResolve() {
                return inscricao.id;
            });
    }
    function formatIn(inscricao) {
        inscricao.data_de_nascimento = moment.utc(inscricao.data_de_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
        inscricao.sexo = (inscricao.sexo === 'Feminino') ? 1 : 2;
        inscricao.estrangeiro = (inscricao.estrangeiro === false) ? 0 : 1;
        inscricao.telefones = [
            inscricao.codigo_internacional_1,
            '_',
            inscricao.codigo_nacional_1,
            '_',
            inscricao.numero_1,
            ',',
            inscricao.codigo_internacional_2,
            '_',
            inscricao.codigo_nacional_2,
            '_',
            inscricao.numero_2,
            ',',
            inscricao.codigo_internacional_3,
            '_',
            inscricao.codigo_nacional_3,
            '_',
            inscricao.numero_3
        ].join('');
        if (inscricao.curso_matutino === undefined) {
            inscricao.curso_matutino = null;
        }
        if (inscricao.curso_vespertino === undefined) {
            inscricao.curso_vespertino = null;
        }
        return inscricao;
    }
    function formatOut(inscricao) {
        inscricao.data_de_nascimento = moment.utc(inscricao.data_de_nascimento).format('D/M/YYYY');
        inscricao.sexo = (inscricao.sexo === 1) ? 'Feminino' : 'Masculino';
        inscricao.estrangeiro = (inscricao.estrangeiro === 0) ? false : true;
        inscricao.telefones = inscricao.telefones.split(',');
        if (inscricao.telefones[0]) {
            inscricao.telefones[0] = inscricao.telefones[0].split('_');
            if (inscricao.telefones[0][0]) {
                inscricao.codigo_internacional_1 = inscricao.telefones[0][0];
            }
            if (inscricao.telefones[0][1]) {
                inscricao.codigo_nacional_1 = inscricao.telefones[0][1];
            }
            if (inscricao.telefones[0][2]) {
                inscricao.numero_1 = inscricao.telefones[0][2];
            }
        }
        if (inscricao.telefones[1]) {
            inscricao.telefones[1] = inscricao.telefones[1].split('_');
            if (inscricao.telefones[1][0]) {
                inscricao.codigo_internacional_2 = inscricao.telefones[1][0];
            }
            if (inscricao.telefones[1][1]) {
                inscricao.codigo_nacional_2 = inscricao.telefones[1][1];
            }
            if (inscricao.telefones[1][2]) {
                inscricao.numero_2 = inscricao.telefones[1][2];
            }
        }
        if (inscricao.telefones[2]) {
            inscricao.telefones[2] = inscricao.telefones[2].split('_');
            if (inscricao.telefones[2][0]) {
                inscricao.codigo_internacional_3 = inscricao.telefones[2][0];
            }
            if (inscricao.telefones[2][1]) {
                inscricao.codigo_nacional_3 = inscricao.telefones[2][1];
            }
            if (inscricao.telefones[2][2]) {
                inscricao.numero_3 = inscricao.telefones[2][2];
            }
        }
        return inscricao;
    }
    function readAll() {
        return modules
            .executor(
                squel
                    .select()
                    .from('inscricao')
                    .where('__status__ = 1')
                    .order('nome_completo')
            )
            .then(function onResolve(value) {
                let inscricoes = value.result.map(function map(inscricao) {
                    return formatOut(inscricao);
                });
                return inscricoes;
            });
    }
    function readById(id) {
        return modules
            .executor(
                squel
                    .select()
                    .from('inscricao')
                    .where('id = ?', id)
                    .where('__status__ = 1')
            )
            .then(function onResolve(value) {
                if (value.result.length === 0) {
                    throw {
                        isError: true,
                        type: 'NO_SUCH_ID'
                    }
                }
                let inscricao = formatOut(value.result[0]);
                return inscricao;
            });
    }
    function readStatusById(id) {
        return modules
            .executor
            .getFirst(
                squel
                    .select()
                    .field('status')
                    .from('inscricao')
                    .where('id = ?', id)
                    .where('__status__ = 1')
            )
            .then(function onResolve(value) {
                if (value) {
                    if (value.status === 0) {
                        return 'pending';
                    }
                    if (value.status === 1) {
                        return 'ok';
                    }
                }
                throw {
                    isError: true,
                    type: 'UNKNOWN_PAYMENT_STATUS'
                };
            });
    }
    function setCase(inscricao) {
        inscricao.nome_completo = inscricao.nome_completo.toUpperCase();
        // inscricao.data_de_nascimento
        // inscricao.sexo
        inscricao.email = inscricao.email.toLowerCase();
        // inscricao.estrangeiro
        // inscricao.cpf
        inscricao.nome_do_documento = inscricao.nome_do_documento.toUpperCase();
        inscricao.numero_do_documento = inscricao.numero_do_documento.toUpperCase();
        // inscricao.telefones
        inscricao.logradouro = inscricao.logradouro.toUpperCase();
        inscricao.numero = inscricao.numero.toUpperCase();
        inscricao.complemento = inscricao.complemento.toUpperCase();
        inscricao.bairro = inscricao.bairro.toUpperCase();
        inscricao.localidade = inscricao.localidade.toUpperCase();
        inscricao.uf = inscricao.uf.toUpperCase();
        // inscricao.cep
        inscricao.endereco = inscricao.endereco.toUpperCase();
        inscricao.nome_no_cracha = inscricao.nome_no_cracha.toUpperCase();
        // inscricao.categoria
        inscricao.curso_ou_formacao = inscricao.curso_ou_formacao.toUpperCase();
        inscricao.acronimo_da_instituicao_ou_empresa = inscricao.acronimo_da_instituicao_ou_empresa.toUpperCase();
        inscricao.nome_da_instituicao_ou_empresa = inscricao.nome_da_instituicao_ou_empresa.toUpperCase();
        return inscricao;
    }
    function update(inscricao, email) {
        inscricao = formatIn(inscricao);
        inscricao = setCase(inscricao);
        return modules
            .executor(
                squel
                    .update()
                    .table('inscricao')
                    .set('nome_completo', inscricao.nome_completo)
                    .set('data_de_nascimento', inscricao.data_de_nascimento)
                    .set('sexo', inscricao.sexo)
                    .set('email', inscricao.email)
                    .set('estrangeiro', inscricao.estrangeiro)
                    // .set('cpf', inscricao.cpf)
                    .set('nome_do_documento', inscricao.nome_do_documento)
                    .set('numero_do_documento', inscricao.numero_do_documento)
                    .set('telefones', inscricao.telefones)
                    .set('logradouro', inscricao.logradouro)
                    .set('numero', inscricao.numero)
                    .set('complemento', inscricao.complemento)
                    .set('bairro', inscricao.bairro)
                    .set('localidade', inscricao.localidade)
                    .set('uf', inscricao.uf)
                    .set('cep', inscricao.cep)
                    .set('endereco', inscricao.endereco)
                    .set('nome_no_cracha', inscricao.nome_no_cracha)
                    // .set('categoria', inscricao.categoria)
                    .set('curso_ou_formacao', inscricao.curso_ou_formacao)
                    .set('acronimo_da_instituicao_ou_empresa', inscricao.acronimo_da_instituicao_ou_empresa)
                    .set('nome_da_instituicao_ou_empresa', inscricao.nome_da_instituicao_ou_empresa)
                    .set('curso_matutino', inscricao.curso_matutino)
                    .set('curso_vespertino', inscricao.curso_vespertino)
                    .where('id = ?', inscricao.id)
            )
            .then(function onResolve(value) {
                return modules
                    .executor(
                        squel
                            .update()
                            .table('usuario')
                            .set('inscricao', inscricao.id)
                            .where('email = ?', email)
                            .where('__status__ = 1')
                    );
            })
            .then(function onResolve(value) {
                return inscricao.id;
            });
    }
}(
    require('bluebird'),
    { //modules
        executor: require('../modules/executor'),
        logger: require('../modules/logger')
    },
    require('moment'),
    require('squel')
));
