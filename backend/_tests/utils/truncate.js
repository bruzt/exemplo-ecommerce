
const sequelize = require('../../src/database/connection');

module.exports = () => {

    return Promise.all(Object.keys(sequelize.models).map( async (key) => {
        
        return [
            sequelize.models[key].truncate({ cascade: true, restartIdentity: true }),
            //sequelize.models[key].destroy({ truncate: true, force: true }),
            //sequelize.query(`DELETE FROM sqlite_sequence WHERE name = '${sequelize.models[key].tableName}'`)
        ]
    }));
}