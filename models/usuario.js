'use strict';
(function (
    models,
    modules,
    settings,
    squel
) {
    let model = {
        create: create,
        read: read
    };
    module.exports = model;
    /*
     * functions
     */
    function create(email) {
        modules.logger.info(`Criando usuário: ${email}.`);
        return modules
            .executor(
                squel
                    .insert()
                    .into('usuario')
                    .setFields({
                        'email': email,
                        '__status__': 1
                    })
            )
            .then(function onResolve() {
                modules.logger.info(`Usuário criado. E-mail: ${email}.`);
                return getInscricao(email);
            });
    }
    function getInscricao(email) {
        return modules
            .executor
            .getFirst(
                squel
                    .select()
                    .field('id')
                    .from('inscricao')
                    .where('email = ?', email)
                    .where('__status__ = 1')
            )
            .then(function onResolve(value) {
                return (value) ? value.id : value;
            });
    }
    function setInscricao(email, inscricao) {
        return modules
            .executor(
                squel
                    .update()
                    .table('usuario')
                    .set('inscricao', inscricao)
                    .where('email = ?', email)
                    .where('__status__ = 1')
            );
    }
    function getPermissions(email) {
        if (email in settings.permissions) {
            return settings.permissions[email];
        }
        return settings.permissions.default;
    }
    function read(email) {
        modules.logger.info(`Buscando usuário: ${email}.`);
        let usuario = {
            email: email,
            inscricao: null,
            permissions: getPermissions(email)
        };
        return modules
            .executor
            .getFirst(
                squel
                    .select()
                    .field('inscricao')
                    .from('usuario')
                    .where('email = ?', email)
                    .where('__status__ = 1')
            )
            .then(function onResolve(value) {
                if (value === null) {
                    return null;
                }
                usuario.inscricao = value.inscricao;
                return usuario;
            })
            .then(function onResolve(value) {
                if (value === null) {
                    return model
                        .create(email)
                        .then(function onResolve(inscricao) {
                            if (inscricao) {
                                modules.logger.info(`Inscrição preexistente encontrada para o e-mail ${email}. Inscrição: ${inscricao}.`);
                                usuario.inscricao = inscricao;
                                return setInscricao(email, inscricao)
                                    .then(function onResolve() {
                                        return usuario;
                                    });
                            }
                            return usuario;
                        });
                }
                modules.logger.info(`Usuário encontrado. E-mail: ${email}.`);
                return usuario;
            });
    }
}(
    { //models
        trabalho: require('./trabalho')
    },
    { //modules
        executor: require('../modules/executor'),
        logger: require('../modules/logger')
    },
    { //settings
        permissions: require('../settings/permissions')
    },
    require('squel')
));
