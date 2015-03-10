'use strict';
(function (
    bluebird,
    modules,
    mysql,
    settings
) {
    module.exports = execute;
    let Promise = bluebird;
    execute.first = first;
    function execute(query) {
        return new Promise(function executor(resolve, reject) {
            let connection = mysql.createConnection(settings.database);
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
    function first(value) {
        let valueResult = value.result;
        return (valueResult.length) ? Promise.resolve(valueResult[0]) : Promise.resolve(null);
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
