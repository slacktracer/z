'use strict';
(function (
    bluebird,
    modules,
    mysql,
    settings
) {
    module.exports = execute;
    let databaseSettings = settings.database[settings.database.active];
    let Promise = bluebird;
    execute.getFirst = getFirst;
    function execute(query) {
        return new Promise(function executor(resolve, reject) {
            let connection = mysql.createConnection(databaseSettings);
            connection.connect();
            connection.query(query.toString(), function (error, result, fields) {
                if (error) {
                    modules.logger.error(`Ocorreu um erro no processamento da query: ${query.toString()}`, error);
                    reject({
                        isError: true,
                        type: 'DATABASE'
                    });
                    return false;
                }
                resolve({
                    fields: fields,
                    result: result
                });
                return true;
            });
            connection.end();
        });
    }
    function getFirst(query) {
        return execute(query)
            .then(function onResolve(value) {
                let valueResult = value.result;
                return (valueResult.length) ? valueResult[0] : null;
            });
    }
}(
    require('bluebird'),
    { //modules
        logger: require('./logger')
    },
    require('mysql'),
    { //settings
        database: require('../settings/database')
    }
));
