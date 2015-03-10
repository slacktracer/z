'use strict';
(function (
    bluebird,
    models,
    modules
) {
    let Promise = bluebird;
    let model = {
        create: function create(session, data) {
            return modules
                .verifier(data.assertion)
                .then(function onResolve(email) {
                    return models.usuario.read(email);
                })
                .then(function onResolve(usuario) {
                    load(session, usuario);
                    return set(session);
                });
        },
        destroy: function destroy(session) {
            return Promise.resolve(unset(session));
        },
        read: function read(session) {
            return Promise.resolve(set(session));
        }
    };
    module.exports = model;
    function load(session, usuario) {
        session.email = usuario.email;
        session.inscricao = usuario.inscricao;
        session.permissions = usuario.permissions;
        return session;
    }
    function set(session) {
        return {
            email: session.email,
            inscricao: session.inscricao,
            permissions: session.permissions
        };
    }
    function unset(session) {
        session.email = null;
        session.inscricao = null;
        session.permissions = [];
        return {
            email: null,
            inscricao: null,
            permissions: []
        };
    }
}(
    require('bluebird'),
    { //models
        usuario: require('./usuario')
    },
    { //modules
        verifier: require('../modules/verifier')
    }
));
